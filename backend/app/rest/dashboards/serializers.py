from typing import List

from pydantic import BaseModel

from app.core.crud import CrudSerializer


class UserModel(BaseModel):
    email: str


class ProjectUpdateModel(BaseModel):
    id: int
    name: str


class DashboardGetModel(BaseModel):
    id: int
    name: str


class DashboardCreateUpdateModel(BaseModel):
    name: str
    project: ProjectUpdateModel


class DashboardRemoveModel(BaseModel):
    id: int


class DashboardGetListModel(BaseModel):
    items: List[DashboardGetModel]
    count: int


class DashboardSerializer(CrudSerializer):
    # get_list_response_model = DashboardGetListModel
    # get_item_response_model = DashboardGetModel
    update_item_request_model = DashboardCreateUpdateModel
    update_item_response_model = DashboardGetModel
    create_item_request_model = DashboardCreateUpdateModel
    create_item_response_model = DashboardGetModel
    remove_item_response_model = DashboardRemoveModel
