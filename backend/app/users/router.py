from typing import List

from fastapi import APIRouter

from .views import (
    GetRolesResponseModel,
    GetUsersResponseModel,
    create_role,
    create_user,
    get_role,
    get_roles,
    get_user,
    get_users,
    remove_role,
    remove_user,
    update_role,
    update_user,
)

users_router = APIRouter(
    prefix="/api/v1/users",
    tags=["users"],
    responses={404: {"description": "Not found"}},
)

roles_router = APIRouter(
    prefix="/api/v1/roles",
    tags=["roles"],
    responses={404: {"description": "Not found"}},
)

users_router.add_api_route(
    "/", get_users, response_model=List[GetUsersResponseModel]
)
users_router.add_api_route("/", create_user, methods=["POST"])
users_router.add_api_route("/{user_id:int}", get_user)
users_router.add_api_route("/{user_id:int}", remove_user, methods=["DELETE"])
users_router.add_api_route("/{user_id:int}", update_user, methods=["PUT"])

roles_router.add_api_route(
    "/", get_roles, response_model=List[GetRolesResponseModel]
)
roles_router.add_api_route("/", create_role, methods=["POST"])
roles_router.add_api_route("/{role_id:int}", get_role)
roles_router.add_api_route("/{role_id:int}", remove_role, methods=["DELETE"])
roles_router.add_api_route("/{role_id:int}", update_role, methods=["PUT"])
