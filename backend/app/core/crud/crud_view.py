from fastapi import HTTPException

from .crud_serializer import CrudSerializer


class CrudView:
    def __init__(self, model, serializer: CrudSerializer):
        self.model = model
        self.serializer = serializer

    def get_list_view(self):
        async def list_view():
            items = await self.model.query.gino.all()
            return [item.to_dict() for item in items]

        return list_view

    def get_item_view(self):
        async def item_view(item_id: int):
            item = await self.model.get(item_id)
            if not item:
                raise HTTPException(status_code=404, detail="Not found")
            return item.to_dict()

        return item_view

    def get_create_view(self):
        create_model = self.serializer.create_item_request_model

        async def create_view(data: create_model):
            item = await self.model.create(**dict(data))
            return item.to_dict()

        return create_view

    def get_remove_view(self):
        async def remove_view(item_id: int):
            item = await self.model.get(item_id)
            if not item:
                raise HTTPException(status_code=400, detail="Role not found")
            await item.delete()
            return {"message": "success", "id": item_id}

        return remove_view

    def get_update_view(self):
        update_model = self.serializer.update_item_request_model

        async def update_view(item_id: int, data: update_model):
            item = await self.model.get(item_id)
            await item.update(**dict(data)).apply()
            return item.to_dict()

        return update_view
