from app.core.crud import CrudSerializer
from pydantic import BaseModel


class RoleBaseFields(BaseModel):
    name: str


class RoleGetModel(RoleBaseFields):
    id: int


class RoleCreateUpdateModel(RoleBaseFields):
    pass


class RoleRemoveModel(BaseModel):
    id: int


class RoleSerializer(CrudSerializer):
    get_list_response_model = RoleGetModel
    get_item_response_model = RoleGetModel
    update_item_request_model = RoleBaseFields
    update_item_response_model = RoleGetModel
    create_item_request_model = RoleBaseFields
    create_item_response_model = RoleGetModel
    remove_item_response_model = RoleRemoveModel
