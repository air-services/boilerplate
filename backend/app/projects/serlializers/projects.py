from typing import List

from app.core.crud import CrudSerializer
from pydantic import BaseModel


class ProjectGetModel(BaseModel):
    id: int
    name: str


class ProjectCreateUpdateModel(BaseModel):
    name: str


class ProjectRemoveModel(BaseModel):
    id: int


class ProjectGetListModel(BaseModel):
    items: List[ProjectGetModel]
    count: int


class ProjectSerializer(CrudSerializer):
    get_list_response_model = ProjectGetListModel
    get_item_response_model = ProjectGetModel
    update_item_request_model = ProjectCreateUpdateModel
    update_item_response_model = ProjectGetModel
    create_item_request_model = ProjectCreateUpdateModel
    create_item_response_model = ProjectGetModel
    remove_item_response_model = ProjectRemoveModel
