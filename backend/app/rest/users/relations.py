from app.core.crud.crud_relations import (
    CrudModelRelation,
    CrudModelRelationType,
    CrudRelations,
)
from app.rest.projects.associations import ProjectsUsers
from app.rest.projects.models import Project
from app.rest.roles.models import Role

from .associations import UsersRoles
from .models import User


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
    get_list_relations = [RolesRelation, ProjectsRelation]
