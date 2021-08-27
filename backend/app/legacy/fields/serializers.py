from typing import List, Optional

from pydantic import BaseModel

from app.core.crud import CrudSerializer


class ApplicationBase(BaseModel):
    id: int
    name: str


class FieldBase(BaseModel):
    name: str
    description: Optional[str]


class FieldGetItem(FieldBase):
    id: int
    template: Optional[ApplicationBase]


class FieldUpdate(FieldGetItem):
    pass


class FieldCreate(FieldBase):
    pass


class FieldGetList(BaseModel):
    count: int
    items: List[FieldGetItem]


class FieldRemove(BaseModel):
    id: int


class FieldSerializer(CrudSerializer):
    # get_list_response_model = FieldGetList
    get_item_response_model = FieldGetItem
    update_item_request_model = FieldUpdate
    update_item_response_model = FieldGetItem
    create_item_request_model = FieldCreate
    create_item_response_model = FieldGetItem
    remove_item_response_model = FieldRemove
