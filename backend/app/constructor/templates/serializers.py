from typing import List, Optional

from pydantic import BaseModel

from app.core.crud import CrudSerializer


class TemplateField(BaseModel):
    id: Optional[int]
    name: str
    description: Optional[str]
    size: Optional[int]
    data_type_id: int
    foreign_key_id: Optional[int]


class TemplateBase(BaseModel):
    name: str
    description: str


class TemplateGetItem(TemplateBase):
    id: int
    fields: List[TemplateField]


class TemplateUpdate(TemplateGetItem):
    pass


class TemplateCreate(TemplateBase):
    fields: List[TemplateField]


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
