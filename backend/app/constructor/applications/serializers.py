from typing import List, Optional

from pydantic import BaseModel

from app.core.crud import CrudSerializer


class ApplicationField(BaseModel):
    id: Optional[int]
    name: str
    description: Optional[str]
    size: Optional[int]
    data_type_id: int
    foreign_key_id: Optional[int]
    is_index: Optional[bool]
    is_primary_key: Optional[bool]


class ApplicationBase(BaseModel):
    name: str
    table_name: str
    description: str


class ApplicationGetItem(ApplicationBase):
    id: int
    fields: List[ApplicationField]


class ApplicationUpdate(ApplicationGetItem):
    pass


class ApplicationCreate(ApplicationBase):
    fields: List[ApplicationField]


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
