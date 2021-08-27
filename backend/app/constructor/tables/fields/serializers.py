import enum
from typing import List, Optional

from pydantic import BaseModel

from app.core.crud import CrudSerializer


class TableFieldBase(BaseModel):
    name: str
    is_primary_key: bool
    is_index: bool
    allow_null: bool
    allow_empty: bool
    type: enum.Enum
    table_id: int


class TableFieldGetItem(TableFieldBase):
    id: int


class TableFieldUpdate(TableFieldGetItem):
    pass


class TableFieldCreate(TableFieldBase):
    pass


class TableFieldGetList(BaseModel):
    count: int
    items: List[TableFieldGetItem]


class TableFieldRemove(BaseModel):
    id: int


class TableFieldSerializer(CrudSerializer):
    get_list_response_model = TableFieldGetList
    get_item_response_model = TableFieldGetItem
    update_item_request_model = TableFieldUpdate
    update_item_response_model = TableFieldGetItem
    create_item_request_model = TableFieldCreate
    create_item_response_model = TableFieldGetItem
    remove_item_response_model = TableFieldRemove
