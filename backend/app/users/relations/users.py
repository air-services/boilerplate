from app.core.crud.crud_relations import (
    CrudModelRelation,
    CrudModelRelationType,
    CrudRelations,
)
from app.projects.models import Project, ProjectsUsers

from ..models import Role, User, UsersRoles


class RolesRelation(CrudModelRelation):
    relation_type = CrudModelRelationType.MANY_TO_MANY
    field = "roles"
    relation_key = "role_id"
    through_key = "user_id"
    base_key = "user_id"
    model = User
    relation_model = Role
    through_model = UsersRoles


class ProjectsRelation(CrudModelRelation):
    relation_type = CrudModelRelationType.MANY_TO_MANY
    field = "projects"
    relation_key = "project_id"
    through_key = "user_id"
    base_key = "user_id"
    model = User
    relation_model = Project
    through_model = ProjectsUsers


class UserCrudRelations(CrudRelations):
    get_item_relations = [RolesRelation, ProjectsRelation]
    update_item_relations = [RolesRelation, ProjectsRelation]
