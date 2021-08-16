from app.core.crud.crud_relations import (
    CrudModelRelation,
    CrudModelRelationType,
    CrudRelations,
)

from .models import Card, Icon


class IconRelation(CrudModelRelation):
    relation_type = CrudModelRelationType.PARENT
    field = "icon"
    model = Card
    relation_model = Icon
    base_key = "card_id"
    relation_key = "icon_id"


class CardCrudRelations(CrudRelations):
    get_item_relations = [IconRelation]
    get_list_relations = [IconRelation]
    update_item_relations = [IconRelation]
