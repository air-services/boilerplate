from typing import List, Optional

from pydantic import BaseModel

from app.core.crud import CrudSerializer


class IconBase(BaseModel):
    name: str


class IconGetItem(IconBase):
    id: int


class IconUpdate(IconGetItem):
    pass


class IconCreate(IconBase):
    pass


class IconGetList(BaseModel):
    count: int
    items: List[IconGetItem]


class IconRemove(BaseModel):
    id: int


class IconSerializer(CrudSerializer):
    get_list_response_model = IconGetList
    get_item_response_model = IconGetItem
    update_item_request_model = IconUpdate
    update_item_response_model = IconGetItem
    create_item_request_model = IconCreate
    create_item_response_model = IconGetItem
    remove_item_response_model = IconRemove
