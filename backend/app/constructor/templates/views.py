from app.core.crud import CrudView
from app.core.crud.crud_relations import (
    CrudModelRelation,
    CrudModelRelationType,
)
from app.core.crud.view.update_relations import UpdateItemRelations


class UpdateNested(UpdateItemRelations):
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
                await UpdateNested._update_item_children_relations(
                    item_id=item.id, data=data, relation=relation
                )
            if relation.relation_type == CrudModelRelationType.PARENT:
                await UpdateItemRelations._update_item_parent_relations(
                    item, data, relation
                )

    @staticmethod
    async def _create_item_children(
        item_id, data, relation: CrudModelRelation
    ):
        insert_values = [
            {
                relation.base_key: item_id,
                **{
                    key: item.dict()[key]
                    for key in item.dict()
                    if key not in ["id"]
                },
            }
            for item in getattr(data, relation.field)
            if not item.id
        ]

        await relation.relation_model.insert().gino.all(insert_values)

    @staticmethod
    async def _update_item_children_data(item_id, data, relation):
        ids = [item.id for item in getattr(data, relation.field)]
        cache = {
            item.id: item.dict() for item in getattr(data, relation.field)
        }
        await relation.relation_model.query.where(
            getattr(relation.relation_model, "id").in_(ids)
        ).gino.all()
        for item in await relation.relation_model.query.where(
            getattr(relation.relation_model, "id").in_(ids)
        ).gino.all():
            await item.update(**cache.get(item.id)).apply()

    @staticmethod
    async def _update_item_children_relations(
        item_id, data, relation: CrudModelRelation
    ):
        await UpdateItemRelations._update_item_children_relations(
            item_id, data, relation
        )
        await UpdateNested._update_item_children_data(item_id, data, relation)
        await UpdateNested._create_item_children(item_id, data, relation)


class TemplateView(CrudView, UpdateNested):
    pass
