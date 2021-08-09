from fastapi import HTTPException

from app.core.database import db

from ..crud_relations import CrudRelations
from ..crud_serializer import CrudSerializer


class CrudDeleteItemView:
    model: db.Model
    serializer: CrudSerializer = None
    relations: CrudRelations = CrudRelations

    def get_remove_view(self):
        async def remove_view(item_id: int):
            item = await self.model.get(item_id)
            if not item:
                raise HTTPException(status_code=400, detail="Item not found")
            await item.delete()
            return {"message": "success", "id": item_id}

        return remove_view
