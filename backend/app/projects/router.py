from app.core.crud import CrudRouter, CrudSerializers
from pydantic import BaseModel

from .models import Project


class ProjectGetModel(BaseModel):
    id: int
    name: str


class ProjectCreateUpdateModel(BaseModel):
    name: str


class ProjectRemoveModel(BaseModel):
    id: int


class ProjectSerializers(CrudSerializers):
    get_list_response_model = ProjectGetModel
    get_item_response_model = ProjectGetModel
    update_item_request_model = ProjectCreateUpdateModel
    update_item_response_model = ProjectGetModel
    create_item_request_model = ProjectCreateUpdateModel
    create_item_response_model = ProjectGetModel
    remove_item_response_model = ProjectRemoveModel


projects_router = CrudRouter(
    model=Project,
    serializers=ProjectSerializers,
    prefix="/api/v1/projects",
    tags=["projects"],
    responses={404: {"description": "Not found"}},
).get_router()

# from typing import List
#
# from fastapi import APIRouter

# from .views import (
#     GetProjectsResponseModel,
#     UpdateProjectRequestModel,
#     UpdateProjectResponseModel,
#     projects_crud,
# )
#
# projects_router = APIRouter(
#     prefix="/api/v1/projects",
#     tags=["projects"],
#     responses={404: {"description": "Not found"}},
# )

#
# class CrudRouter:
#     def __init__(
#         self,
#         model,
#         prefix,
#         tags,
#         responses={404: {"description": "Not found"}},
#     ):
#         self.router = APIRouter(prefix=prefix, tags=tags, responses=responses)
#         self.model = model
#
#         self._init_views()
#
#     def get_router(self):
#         return self.router
#
#     def _init_views(self):
#         self.router.add_api_route(
#             "/",
#             projects_crud.get_list_view(),
#             response_model=List[GetProjectsResponseModel],
#         )
#
#         self.router.add_api_route(
#             "/{item_id:int}",
#             projects_crud.get_update_view(),
#             methods=["PUT"],
#             response_model=UpdateProjectResponseModel,
#         )
