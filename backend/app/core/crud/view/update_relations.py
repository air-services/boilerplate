from sqlalchemy.sql.expression import and_

from ..crud_relations import CrudModelRelation, CrudModelRelationType


class UpdateItemRelations:
    @staticmethod
    async def update_item_relations(data, item, relations):
        for relation in relations.update_item_relations:
            if relation.relation_type == CrudModelRelationType.MANY_TO_MANY:
                await UpdateItemRelations._update_item_many_to_many_relations(
                    item_id=item.id,
                    data=data,
                    data_key=relation.field,
                    through_model=relation.through_model,
                    relation_key=relation.relation_key,
                    base_key=relation.base_key,
                )
            if relation.relation_type == CrudModelRelationType.CHILDREN:
                await UpdateItemRelations._update_item_children_relations(
                    item_id=item.id, data=data, relation=relation
                )
            if relation.relation_type == CrudModelRelationType.PARENT:
                await UpdateItemRelations._update_item_parent_relations(
                    item, data, relation
                )

    @staticmethod
    async def _update_item_parent_relations(
        item, data, relation: CrudModelRelation
    ):
        prev_id = getattr(item, relation.relation_key)
        next_id = getattr(data, relation.field).dict().get("id")
        if prev_id != next_id:
            update_info = {relation.relation_key: next_id}
            await item.update(**update_info).apply()

    @staticmethod
    async def _update_item_children_relations(
        item_id, data, relation: CrudModelRelation
    ):
        next_ids = set(
            [
                item.get("id")
                for item in data.dict().get(relation.field)
                if item.get("id")
            ]
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
    async def _update_item_many_to_many_relations(
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
