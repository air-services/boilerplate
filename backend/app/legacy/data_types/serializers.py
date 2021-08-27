from typing import List

from pydantic import BaseModel

from app.core.crud import CrudSerializer


class DataTypeBase(BaseModel):
    name: str


class DataTypeGetItem(DataTypeBase):
    id: int


class DataTypeUpdate(DataTypeGetItem):
    pass


class DataTypeCreate(DataTypeBase):
    pass


class DataTypeGetList(BaseModel):
    count: int
    items: List[DataTypeGetItem]


class DataTypeRemove(BaseModel):
    id: int


class DataTypeSerializer(CrudSerializer):
    get_list_response_model = DataTypeGetList
    get_item_response_model = DataTypeGetItem
    update_item_request_model = DataTypeUpdate
    update_item_response_model = DataTypeGetItem
    create_item_request_model = DataTypeCreate
    create_item_response_model = DataTypeGetItem
    remove_item_response_model = DataTypeRemove
