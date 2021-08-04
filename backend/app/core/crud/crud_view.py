import json

from app.core.crud.crud_relations import CrudModelRelationType
from app.core.database import db
from fastapi import HTTPException
from sqlalchemy import asc, desc
from sqlalchemy.sql.expression import and_

from .crud_relations import CrudRelations
from .crud_serializer import CrudSerializer

SORT_ORDER_MAP = {"DESC": desc, "ASC": asc}


class CrudView:
    def __init__(
        self,
        model: db.Model,
        serializer: CrudSerializer = None,
        relations: CrudRelations = None,
    ):
        self.model = model
        self.relations = relations
        self.serializer = serializer
        self.limit = 10

    def get_list_view(self):
        async def list_view(
            search: str = "", pagination: str = "", sorting: str = ""
        ):
            query = self.model.query
            query = self._apply_search(query, search)
            query = query.order_by(self._get_list_order(sorting))
            query = self._apply_pagination(query, pagination)

            items_query = await query.gino.all()
            items_count = await self._apply_search(
                db.select([db.func.count(self.model.id)]), search
            ).gino.scalar()

            self.items = [item.to_dict() for item in items_query]
            for relation in self.relations.get_list_relations:
                await self._inject_many_to_many_info(relation)

            return {
                "items": self.items,
                "count": items_count,
            }

        return list_view

    def get_item_view(self):
        async def item_view(item_id: int):
            item = await self.model.get(item_id)
            if not item:
                raise HTTPException(status_code=404, detail="Not found")
            item_data = item.to_dict()
            relations_data = await self.get_item_relations_data(item.id)
            return {**item_data, **relations_data}

        return item_view

    async def get_item_relations_data(self, item_id):
        result = {}
        for relation in self.relations.get_item_relations:
            relation_data = await self._get_many_to_many_item_relations(
                item_id=item_id,
                relation_model=relation.relation_model,
                through_model=relation.through_model,
                relation_key=relation.relation_key,
                through_key=relation.through_key,
            )
            result[relation.field] = relation_data
        return result

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
                raise HTTPException(status_code=400, detail="Item not found")
            await item.delete()
            return {"message": "success", "id": item_id}

        return remove_view

    def get_update_view(self):
        update_model = self.serializer.update_item_request_model

        async def update_view(item_id: int, data: update_model):
            item = await self.model.get(item_id)
            await self._update_main_data(data, item)
            await self._update_relations(data, item)
            return {"id": item_id, **data.dict()}

        return update_view

    async def _update_main_data(self, data, item):
        relation_fields = {
            relation.field for relation in self.relations.update_item_relations
        }
        await item.update(
            **{key: value for key, value in data if key not in relation_fields}
        ).apply()

    async def _update_relations(self, data, item):
        for relation in self.relations.update_item_relations:
            if relation.relation_type == CrudModelRelationType.MANY_TO_MANY:
                await self._update_many_to_many_relations(
                    item_id=item.id,
                    data=data,
                    data_key=relation.field,
                    through_model=relation.through_model,
                    relation_key=relation.relation_key,
                    base_key=relation.base_key,
                )

    def _apply_pagination(self, query, pagination):
        page = 1
        limit = self.limit

        if pagination:
            pagination_data = json.loads(pagination)
            page = pagination_data.get("page", page)
            limit = pagination_data.get("limit", limit)
        return query.limit(limit).offset((page - 1) * limit)

    def _apply_search(self, query, search):
        if search:
            for filter in json.loads(search):
                operator = filter.get("operator")
                field_key = filter.get("field")
                value = filter.get("value")

                field = getattr(self.model, field_key)

                if operator == "like":
                    query = query.where(getattr(field, operator)(f"%{value}%"))
        return query

    def _get_list_order(self, sorting):
        if sorting:
            order_key = json.loads(sorting).get("order", "ASC")
            field_key = json.loads(sorting).get("field", "id")

            field = getattr(self.model, field_key)
            order = SORT_ORDER_MAP.get(order_key)
            return order(field)
        return self.model.id

    @staticmethod
    async def _get_many_to_many_item_relations(
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
    async def _update_many_to_many_relations(
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

    async def _inject_many_to_many_info(self, relation):
        relations_cache = await self._cache_many_to_many_list_view_map(
            base_items=self.items,
            relation_model=relation.relation_model,
            through_model=relation.through_model,
            base_key=relation.base_key,
            relation_key=relation.relation_key,
        )

        self.items = [
            {**item, relation.field: relations_cache.get(item.get("id"), [])}
            for item in self.items
        ]

    async def _cache_many_to_many_list_view_map(
        self,
        base_items,
        relation_model,
        through_model,
        base_key,
        relation_key,
    ):
        base_ids = [item.get("id") for item in base_items]

        through_items = await through_model.query.where(
            getattr(through_model, base_key).in_(base_ids)
        ).gino.all()
        #
        relations_ids = [
            getattr(through_item, relation_key)
            for through_item in through_items
        ]
        relations = await relation_model.query.where(
            relation_model.id.in_(relations_ids)
        ).gino.all()

        self.relations_map = {}
        for relation in relations:
            self.relations_map[relation.id] = relation.to_dict()

        relations_cache = {}

        for through_item in through_items:
            base_key_value = getattr(through_item, base_key)
            relation_key_value = getattr(through_item, relation_key)
            if not relations_cache.get(base_key_value):
                relations_cache[base_key_value] = []
            relations_cache.get(base_key_value).append(
                self.relations_map[relation_key_value]
            )

        return relations_cache
