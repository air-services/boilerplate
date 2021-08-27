from typing import List

from pydantic import BaseModel

from app.core.crud import CrudSerializer


class ModuleBase(BaseModel):
    application_id: int
    name: str
    icon: str
    url: str
    api: str


class ModuleGetItem(ModuleBase):
    id: int


class ModuleUpdate(ModuleGetItem):
    pass


class ModuleCreate(ModuleBase):
    pass


class ModuleGetList(BaseModel):
    count: int
    items: List[ModuleGetItem]


class ModuleRemove(BaseModel):
    id: int


class ModuleSerializer(CrudSerializer):
    get_list_response_model = ModuleGetList
    get_item_response_model = ModuleGetItem
    update_item_request_model = ModuleUpdate
    update_item_response_model = ModuleGetItem
    create_item_request_model = ModuleCreate
    create_item_response_model = ModuleGetItem
    remove_item_response_model = ModuleRemove
