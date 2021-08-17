from typing import List

from pydantic import BaseModel

from app.core.crud import CrudSerializer


class TemplateBase(BaseModel):
    name: str
    description: str


class TemplateGetItem(TemplateBase):
    id: int


class TemplateUpdate(TemplateGetItem):
    pass


class TemplateCreate(TemplateBase):
    pass


class TemplateGetList(BaseModel):
    count: int
    items: List[TemplateGetItem]


class TemplateRemove(BaseModel):
    id: int


class TemplateSerializer(CrudSerializer):
    get_list_response_model = TemplateGetList
    get_item_response_model = TemplateGetItem
    update_item_request_model = TemplateUpdate
    update_item_response_model = TemplateGetItem
    create_item_request_model = TemplateCreate
    create_item_response_model = TemplateGetItem
    remove_item_response_model = TemplateRemove
