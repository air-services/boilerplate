from fastapi import APIRouter

from .crud_relations import CrudRelations
from .crud_serializer import CrudSerializer
from .view import CrudView


class CrudRouter:
    def __init__(
        self,
        prefix,
        tags,
        model,
        view: CrudView,
        serializer: CrudSerializer,
        relations: CrudRelations = CrudRelations,
        responses={404: {"description": "Not found"}},
    ):
        self.router = APIRouter(prefix=prefix, tags=tags, responses=responses)
        self.serializers = serializer
        self.view = view(
            model=model, serializer=serializer, relations=relations
        )
        self._add_routes()

    def get_router(self):
        return self.router

    def _add_routes(self):
        self.router.add_api_route(
            "/",
            self.view.get_list_view(),
            response_model=self.serializers.get_list_response_model,
        )

        self.router.add_api_route(
            "/{item_id:int}",
            self.view.get_item_view(),
            methods=["GET"],
            response_model=self.serializers.get_item_response_model,
        )

        self.router.add_api_route(
            "/{item_id:int}",
            self.view.get_update_view(),
            methods=["PUT"],
            response_model=self.serializers.update_item_response_model,
        )

        self.router.add_api_route(
            "/{item_id:int}",
            self.view.get_remove_view(),
            methods=["DELETE"],
            # response_model=self.serializers.update_item_response_model,
        )
