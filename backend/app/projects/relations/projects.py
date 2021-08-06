from app.core.crud.crud_relations import (
    CrudModelRelation,
    CrudModelRelationType,
    CrudRelations,
)
from app.projects.models import Dashboard, Project, ProjectsUsers
from app.users.models import User


class DashboardRelation(CrudModelRelation):
    relation_type = CrudModelRelationType.CHILDREN
    field = "dashboards"
    model = Project
    relation_model = Dashboard
    base_key = "project_id"


class UsersRelation(CrudModelRelation):
    relation_type = CrudModelRelationType.MANY_TO_MANY
    field = "users"
    relation_key = "user_id"
    through_key = "project_id"
    base_key = "project_id"
    model = Project
    relation_model = User
    through_model = ProjectsUsers


class ProjectCrudRelations(CrudRelations):
    get_item_relations = [UsersRelation, DashboardRelation]
    update_item_relations = [UsersRelation]
    get_list_relations = [UsersRelation]
