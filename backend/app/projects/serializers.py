from typing import List

from pydantic import BaseModel

from app.core.crud import CrudSerializer


class UserModel(BaseModel):
    id: int
    email: str


class DashboardModel(BaseModel):
    id: int
    name: str


class ProjectGetModel(BaseModel):
    id: int
    name: str
    users: List[UserModel]
    dashboards: List[DashboardModel]


class ProjectCreateUpdateModel(BaseModel):
    name: str
    users: List[UserModel]
    dashboards: List[DashboardModel]


class ProjectRemoveModel(BaseModel):
    id: int


class ProjectGetListModel(BaseModel):
    items: List[ProjectGetModel]
    count: int


class ProjectSerializer(CrudSerializer):
    # get_list_response_model = ProjectGetListModel
    get_item_response_model = ProjectGetModel
    update_item_request_model = ProjectCreateUpdateModel
    # update_item_response_model = ProjectGetModel
    create_item_request_model = ProjectCreateUpdateModel
    create_item_response_model = ProjectGetModel
    remove_item_response_model = ProjectRemoveModel
