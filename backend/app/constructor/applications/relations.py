from app.core.crud.crud_relations import (
    CrudModelRelation,
    CrudModelRelationType,
    CrudRelations,
)

from ..fields.models import Field
from .models import Application


class FieldRelation(CrudModelRelation):
    relation_type = CrudModelRelationType.CHILDREN
    field = "fields"
    model = Application
    relation_model = Field
    base_key = "application_id"


class ApplicationCrudRelations(CrudRelations):
    get_item_relations = [FieldRelation]
    update_item_relations = [FieldRelation]
    get_list_relations = [FieldRelation]
    delete_item_relations = [FieldRelation]
