import json

from sqlalchemy import asc, desc, func, select

from ..crud_relations import CrudModelRelationType, CrudRelations
from ..crud_serializer import CrudSerializer

SORT_ORDER_MAP = {"DESC": desc, "ASC": asc}


class CrudGetListView:
    serializer: CrudSerializer = None
    relations: CrudRelations = CrudRelations

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
                select([func.count(self.model.id)]), search
            ).gino.scalar()

            self.items = [item.to_dict() for item in items_query]

            await self._inject_relations()

            return {
                "items": self.items,
                "count": items_count,
            }

        return list_view

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

    async def _inject_relations(self):
        for relation in self.relations.get_list_relations:
            if relation.relation_type == CrudModelRelationType.MANY_TO_MANY:
                relations_cache = await self._cache_many_to_many_list_view_map(
                    base_items=self.items,
                    relation_model=relation.relation_model,
                    through_model=relation.through_model,
                    base_key=relation.base_key,
                    relation_key=relation.relation_key,
                )

                self.items = [
                    {
                        **item,
                        relation.field: relations_cache.get(
                            item.get("id"), []
                        ),
                    }
                    for item in self.items
                ]
            if relation.relation_type == CrudModelRelationType.PARENT:
                relations_cache = await self._cache_parent_list_view_map(
                    base_items=self.items,
                    relation_model=relation.relation_model,
                    base_key=relation.base_key,
                    relation_key=relation.relation_key,
                )

                self.items = [
                    {
                        **item,
                        relation.field: relations_cache.get(
                            item.get("id"), None
                        ),
                    }
                    for item in self.items
                ]

    async def _cache_parent_list_view_map(
        self, base_items, relation_model, base_key, relation_key
    ):
        base_ids = [item.get(relation_key) for item in base_items]

        relations = await relation_model.query.where(
            getattr(relation_model, "id").in_(base_ids)
        ).gino.all()
        #

        relations_map = {}
        for relation in relations:
            relations_map[relation.id] = relation.to_dict()

        cache = {}

        for item in base_items:
            cache[item.get("id")] = relations_map.get(item.get(relation_key))

        return cache

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
