from app.core.database import db

from ..crud_relations import CrudRelations
from ..crud_serializer import CrudSerializer


class CrudCreateItemView:
    model: db.Model
    serializer: CrudSerializer = None
    relations: CrudRelations = CrudRelations

    def get_create_view(self):
        create_model = self.serializer.create_item_request_model

        async def create_view(data: create_model):
            item = await self.model.create(**dict(data))
            return item.to_dict()

        return create_view
