from app.core.crud.crud_relations import (
    CrudModelRelation,
    CrudModelRelationType,
    CrudRelations,
)

from ..fields.models import Field
from .models import Template


class FieldRelation(CrudModelRelation):
    relation_type = CrudModelRelationType.CHILDREN
    field = "fields"
    model = Template
    relation_model = Field
    base_key = "template_id"


class TemplateCrudRelations(CrudRelations):
    get_item_relations = [FieldRelation]
    update_item_relations = [FieldRelation]
    get_list_relations = [FieldRelation]
