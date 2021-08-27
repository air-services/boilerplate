from typing import List, Optional

from pydantic import BaseModel

from app.core.crud import CrudSerializer


class TableBase(BaseModel):
    name: str
    module_id: int


class TableGetItem(TableBase):
    id: int


class TableUpdate(TableGetItem):
    pass


class TableCreate(TableBase):
    pass


class TableGetList(BaseModel):
    count: int
    items: List[TableGetItem]


class TableRemove(BaseModel):
    id: int


class TableSerializer(CrudSerializer):
    get_list_response_model = TableGetList
    get_item_response_model = TableGetItem
    update_item_request_model = TableUpdate
    update_item_response_model = TableGetItem
    create_item_request_model = TableCreate
    create_item_response_model = TableGetItem
    remove_item_response_model = TableRemove
