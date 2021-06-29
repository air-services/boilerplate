from typing import List

from fastapi import APIRouter

from .crud_serializers import CrudSerializers
from .crud_views import CrudViews


class CrudRouter:
    def __init__(
        self,
        model,
        serializers: CrudSerializers,
        prefix,
        tags,
        responses={404: {"description": "Not found"}},
    ):
        self.router = APIRouter(prefix=prefix, tags=tags, responses=responses)
        self.serializers = serializers
        self.views = CrudViews(model=model, serializers=serializers)
        self._add_routes()

    def get_router(self):
        return self.router

    def _add_routes(self):
        self.router.add_api_route(
            "/",
            self.views.get_list_view(),
            response_model=List[self.serializers.get_list_response_model],
        )

        self.router.add_api_route(
            "/{item_id:int}",
            self.views.get_item_view(),
            methods=["GET"],
            response_model=self.serializers.get_item_response_model,
        )

        self.router.add_api_route(
            "/{item_id:int}",
            self.views.get_update_view(),
            methods=["PUT"],
            response_model=self.serializers.update_item_response_model,
        )
