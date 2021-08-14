from ..crud_relations import CrudRelations
from ..crud_serializer import CrudSerializer
from .update_relations import UpdateItemRelations


class CrudCreateItemView(UpdateItemRelations):
    serializer: CrudSerializer = None
    relations: CrudRelations = CrudRelations

    def get_create_view(self):
        create_model = self.serializer.create_item_request_model

        async def create_view(data: create_model):
            item = await self.create_main_data(data)
            await self.update_item_relations(data, item, self.relations)
            return {"id": item.id, **data.dict()}

        return create_view

    async def create_main_data(self, data):
        relation_fields = {
            relation.field for relation in self.relations.update_item_relations
        }

        item = await self.model.create(
            **{key: value for key, value in data if key not in relation_fields}
        )

        return item
