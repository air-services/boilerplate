from sqlalchemy.sql.expression import and_

from app.core.database import db

from ..crud_relations import (
    CrudModelRelation,
    CrudModelRelationType,
    CrudRelations,
)
from ..crud_serializer import CrudSerializer


class CrudUpdateItemView:
    model: db.Model
    serializer: CrudSerializer = None
    relations: CrudRelations = CrudRelations

    def get_update_view(self):
        update_model = self.serializer.update_item_request_model

        async def update_view(item_id: int, data: update_model):
            item = await self.model.get(item_id)
            await self._update_main_data(data, item)
            await self._update_relations(data, item)
            return {"id": item_id, **data.dict()}

        return update_view

    async def _update_main_data(self, data, item):
        relation_fields = {
            relation.field for relation in self.relations.update_item_relations
        }
        await item.update(
            **{key: value for key, value in data if key not in relation_fields}
        ).apply()

    async def _update_relations(self, data, item):
        for relation in self.relations.update_item_relations:
            if relation.relation_type == CrudModelRelationType.MANY_TO_MANY:
                await self._update_many_to_many_relations(
                    item_id=item.id,
                    data=data,
                    data_key=relation.field,
                    through_model=relation.through_model,
                    relation_key=relation.relation_key,
                    base_key=relation.base_key,
                )
            if relation.relation_type == CrudModelRelationType.CHILDREN:
                await self._update_children_relations(
                    item_id=item.id, data=data, relation=relation
                )
            if relation.relation_type == CrudModelRelationType.PARENT:
                await self._update_parent_relations(item, data, relation)

    async def _update_parent_relations(
        self, item, data, relation: CrudModelRelation
    ):
        prev_id = getattr(item, relation.relation_key)
        next_id = getattr(data, relation.field).dict().get("id")
        if prev_id != next_id:
            update_info = {relation.relation_key: next_id}
            await item.update(**update_info).apply()

    async def _update_children_relations(
        self, item_id, data, relation: CrudModelRelation
    ):
        next_ids = set(
            [item.get("id") for item in data.dict().get(relation.field)]
        )
        prev_ids = set(
            [
                item.id
                for item in await relation.relation_model.query.where(
                    getattr(relation.relation_model, relation.base_key)
                    == item_id
                ).gino.all()
            ]
        )
        to_remove = prev_ids - next_ids
        to_add = next_ids - prev_ids

        clear_values = {relation.base_key: None}
        insert_values = {relation.base_key: item_id}
        await relation.relation_model.update.values(**clear_values).where(
            getattr(relation.relation_model, "id").in_(to_remove),
        ).gino.status()

        await relation.relation_model.update.values(**insert_values).where(
            getattr(relation.relation_model, "id").in_(to_add),
        ).gino.status()

    @staticmethod
    async def _update_many_to_many_relations(
        item_id,
        data,
        data_key,
        through_model,
        relation_key,
        base_key,
    ):
        through_items = await through_model.query.where(
            getattr(through_model, base_key) == item_id
        ).gino.all()
        prev_ids = set([getattr(item, relation_key) for item in through_items])

        next_ids = set(
            [getattr(item, "id") for item in getattr(data, data_key)]
        )

        to_remove = prev_ids - next_ids
        to_add = next_ids - prev_ids

        # remove items
        await through_model.delete.where(
            and_(
                getattr(through_model, base_key) == item_id,
                getattr(through_model, relation_key).in_(to_remove),
            )
        ).gino.status()

        # add items
        insert_values = [
            {base_key: item_id, relation_key: through_id}
            for through_id in to_add
        ]

        await through_model.insert().gino.all(insert_values)
