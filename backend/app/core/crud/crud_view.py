import json

from fastapi import HTTPException
from sqlalchemy.sql.expression import and_

from .crud_serializer import CrudSerializer


class CrudView:
    def __init__(self, model, serializer: CrudSerializer):
        self.model = model
        self.serializer = serializer
        self.limit = 10

    def get_list_view(self):
        async def list_view(search: str = "", pagination: str = ""):
            query = self.model.query.order_by(self.model.id)

            if search:
                name = json.loads(search).get("name")
                if name:
                    query = query.where(self.model.name.like(f"{name}%"))
            query = self._apply_pagination(query, pagination)
            items = await query.gino.all()
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

    def _apply_pagination(self, query, pagination):
        page = 1
        limit = self.limit
        if pagination:
            pagination_data = json.loads(pagination)
            page = pagination_data.get("page", page)
            limit = pagination_data.get("limit", limit)
        return query.limit(limit).offset((page - 1) * limit)

    @staticmethod
    async def _update_many_to_many_relations(
        item_id, data, data_key, through_model, relation_key, base_key,
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
