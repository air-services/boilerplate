from ..relations import CrudRelations
from ..serializer import CrudSerializer
from .update_relations import UpdateItemRelations


class CrudUpdateItemView(UpdateItemRelations):
    serializer: CrudSerializer = None
    relations: CrudRelations = CrudRelations

    def get_update_view(self):
        update_model = self.serializer.update_item_request_model

        async def update_view(item_id: int, data: update_model):
            item = await self.model.get(item_id)
            await self._update_main_data(data, item)
            await self.update_item_relations(data, item, self.relations)
            return {"id": item_id, **data.dict()}

        return update_view

    async def _update_main_data(self, data, item):
        relation_fields = {
            relation.field for relation in self.relations.update_item_relations
        }
        await item.update(
            **{key: value for key, value in data if key not in relation_fields}
        ).apply()
