from app.core.crud.crud_relations import (
    CrudModelRelation,
    CrudModelRelationType,
    CrudRelations,
)
from app.rest.projects.models import Project

from .models import Dashboard


class ProjectRelation(CrudModelRelation):
    relation_type = CrudModelRelationType.PARENT
    field = "project"
    model = Dashboard
    relation_model = Project
    base_key = "dashboard_id"
    relation_key = "project_id"


class DashboardCrudRelations(CrudRelations):
    get_item_relations = [ProjectRelation]
    update_item_relations = [ProjectRelation]
