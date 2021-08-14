from fastapi import HTTPException

from ..crud_relations import (
    CrudModelRelation,
    CrudModelRelationType,
    CrudRelations,
)
from ..crud_serializer import CrudSerializer


class CrudGetItemView:
    serializer: CrudSerializer = None
    relations: CrudRelations = CrudRelations

    def get_item_view(self):
        async def item_view(item_id: int):
            item = await self.model.get(item_id)
            if not item:
                raise HTTPException(status_code=404, detail="Not found")
            item_data = item.to_dict()
            relations_data = await self.get_item_relations(
                item, self.relations
            )
            return {**item_data, **relations_data}

        return item_view

    @staticmethod
    async def get_item_relations(item, relations):
        result = {}
        for relation in relations.get_item_relations:
            if relation.relation_type == CrudModelRelationType.MANY_TO_MANY:
                relation_data = (
                    await CrudGetItemView._get_item_many_to_many_item(
                        item_id=item.id,
                        relation_model=relation.relation_model,
                        through_model=relation.through_model,
                        relation_key=relation.relation_key,
                        through_key=relation.through_key,
                    )
                )
                result[relation.field] = relation_data
            if relation.relation_type == CrudModelRelationType.CHILDREN:
                relation_data = (
                    await CrudGetItemView._get_item_children_relations(
                        item_id=item.id,
                        relation_model=relation.relation_model,
                        base_key=relation.base_key,
                    )
                )
                result[relation.field] = relation_data
            if relation.relation_type == CrudModelRelationType.PARENT:
                relation_data = (
                    await CrudGetItemView._get_item_parent_relations(
                        item=item, relation=relation
                    )
                )
                result[relation.field] = relation_data

        return result

    @staticmethod
    async def _get_item_many_to_many_item(
        item_id, relation_model, through_model, relation_key, through_key
    ):
        through_items = await through_model.query.where(
            getattr(through_model, through_key) == item_id
        ).gino.all()
        ids = [getattr(item, relation_key) for item in through_items]
        items = await relation_model.query.where(
            relation_model.id.in_(ids)
        ).gino.all()
        return [item.to_dict() for item in items]

    @staticmethod
    async def _get_item_children_relations(item_id, relation_model, base_key):
        items = await relation_model.query.where(
            getattr(relation_model, base_key) == item_id
        ).gino.all()
        return [item.to_dict() for item in items]

    @staticmethod
    async def _get_item_parent_relations(item, relation: CrudModelRelation):
        relation_id = getattr(item, relation.relation_key)
        result = await relation.relation_model.get(relation_id)
        if result:
            return result.to_dict()
        return None
