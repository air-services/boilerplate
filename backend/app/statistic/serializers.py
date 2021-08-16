from pydantic import BaseModel

from app.core.crud import CrudSerializer


class CardBaseModel(BaseModel):
    title: str
    value: str
    change: str
    change_title: str
    direction: str


class IconBaseModel(BaseModel):
    name: str


class IconModel(IconBaseModel):
    id: int


class CardGetModel(BaseModel):
    id: int
    icon: IconModel


class CardCreateUpdateModel(CardBaseModel):
    icon: IconModel


class CardRemoveModel(BaseModel):
    id: int


class CardGetListModel(CardBaseModel):
    id: int
    icon: IconModel


class CardSerializer(CrudSerializer):
    # get_list_response_model = CardGetListModel
    # get_item_response_model = CardGetModel
    update_item_request_model = CardCreateUpdateModel
    update_item_response_model = CardGetModel
    create_item_request_model = CardCreateUpdateModel
    create_item_response_model = CardGetModel
    remove_item_response_model = CardRemoveModel


class IconSerializer(CrudSerializer):
    # get_list_response_model = CardGetListModel
    # get_item_response_model = CardGetModel
    update_item_request_model = IconBaseModel
    update_item_response_model = IconBaseModel
    create_item_request_model = IconBaseModel
    create_item_response_model = IconModel
    remove_item_response_model = IconModel
