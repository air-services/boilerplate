from typing import List

from app.core.crud import CrudSerializer
from pydantic import BaseModel


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


class UserListGetModel(UserBaseFields):
    id: int
    roles: List[UserRole]
    projects: List[UserProject]


class UserCreateModel(UserBaseFields):
    pass


class UserUpdateModel(UserBaseFields):
    roles: List[UserRole]


class UserRemoveModel(BaseModel):
    id: int


class UserSerializer(CrudSerializer):
    get_list_response_model = UserListGetModel
    get_item_response_model = UserItemGetModel
    update_item_request_model = UserUpdateModel
    update_item_response_model = UserItemGetModel
    create_item_request_model = UserBaseFields
    create_item_response_model = UserItemGetModel
    remove_item_response_model = UserRemoveModel
