import enum
from typing import List, Optional

from pydantic import BaseModel

from app.core.crud import CrudSerializer


class SerializerBase(BaseModel):
    type: enum.Enum
    module_id: int


class SerializerGetItem(SerializerBase):
    id: int


class SerializerUpdate(SerializerGetItem):
    pass


class SerializerCreate(SerializerBase):
    pass


class SerializerGetList(BaseModel):
    count: int
    items: List[SerializerGetItem]


class SerializerRemove(BaseModel):
    id: int


class SerializerSerializer(CrudSerializer):
    get_list_response_model = SerializerGetList
    get_item_response_model = SerializerGetItem
    update_item_request_model = SerializerUpdate
    update_item_response_model = SerializerGetItem
    create_item_request_model = SerializerCreate
    create_item_response_model = SerializerGetItem
    remove_item_response_model = SerializerRemove
