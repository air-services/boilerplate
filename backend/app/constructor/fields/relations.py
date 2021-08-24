from app.core.crud.crud_relations import (
    CrudModelRelation,
    CrudModelRelationType,
    CrudRelations,
)

from ..applications.models import Application
from .models import Field


class ApplicationRelation(CrudModelRelation):
    relation_type = CrudModelRelationType.PARENT
    field = "application"
    model = Field
    relation_model = Application
    base_key = "field_id"
    relation_key = "application_id"


class FieldCrudRelations(CrudRelations):
    get_item_relations = [ApplicationRelation]
    get_list_relations = [ApplicationRelation]
    update_item_relations = [ApplicationRelation]
