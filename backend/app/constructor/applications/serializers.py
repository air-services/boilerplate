from typing import List

from pydantic import BaseModel

from app.core.crud import CrudSerializer


class ApplicationBase(BaseModel):
    name: str
    description: str
    icon: str
    url: str


class ApplicationGetItem(ApplicationBase):
    id: int


class ApplicationUpdate(ApplicationGetItem):
    pass


class ApplicationCreate(ApplicationBase):
    pass


class ApplicationGetList(BaseModel):
    count: int
    items: List[ApplicationGetItem]


class ApplicationRemove(BaseModel):
    id: int


class ApplicationSerializer(CrudSerializer):
    get_list_response_model = ApplicationGetList
    get_item_response_model = ApplicationGetItem
    update_item_request_model = ApplicationUpdate
    update_item_response_model = ApplicationGetItem
    create_item_request_model = ApplicationCreate
    create_item_response_model = ApplicationGetItem
    remove_item_response_model = ApplicationRemove
