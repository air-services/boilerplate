from fastapi import HTTPException

from ..relations import CrudRelations
from ..serializer import CrudSerializer


class CrudDeleteItemView:
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
