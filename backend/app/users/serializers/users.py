from typing import List

from pydantic import BaseModel

from app.core.crud import CrudSerializer


class UserRole(BaseModel):
    id: int
    name: str


class UserProject(BaseModel):
    id: int
    name: str


class UserBaseFields(BaseModel):
    email: str
    first_name: str
    last_name: str
    patronymic: str
    is_active: bool


class UserItemGetModel(UserBaseFields):
    id: int
    roles: List[UserRole]
    projects: List[UserProject]


class UserListGetModel(BaseModel):
    items: List[UserItemGetModel]
    count: int


class UserCreateModel(UserBaseFields):
    roles: List[UserRole]
    projects: List[UserProject]


class UserUpdateModel(UserBaseFields):
    roles: List[UserRole]
    projects: List[UserProject]


class UserRemoveModel(BaseModel):
    id: int


class UserSerializer(CrudSerializer):
    get_list_response_model = UserListGetModel
    get_item_response_model = UserItemGetModel
    update_item_request_model = UserUpdateModel
    # update_item_response_model = UserItemGetModel
    create_item_request_model = UserCreateModel
    # create_item_response_model = UserItemGetModel
    remove_item_response_model = UserRemoveModel
