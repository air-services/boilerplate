from app.core.crud.crud_relations import (
    CrudModelRelation,
    CrudModelRelationType,
    CrudRelations,
)

from ..templates.models import Template
from .models import Field


class TemplateRelation(CrudModelRelation):
    relation_type = CrudModelRelationType.PARENT
    field = "template"
    model = Field
    relation_model = Template
    base_key = "field_id"
    relation_key = "template_id"


class FieldCrudRelations(CrudRelations):
    get_item_relations = [TemplateRelation]
    get_list_relations = [TemplateRelation]
    update_item_relations = [TemplateRelation]
