from app.users.models import Role
from fastapi import HTTPException
from pydantic import BaseModel


class GetRolesResponseModel(BaseModel):
    id: int
    name: str


class RoleCreateRequest(BaseModel):
    name: str


class RoleUpdateRequest(BaseModel):
    name: str


async def mock_roles():
    await Role.create(name="admin")
    await Role.create(name="developer")
    await Role.create(name="manager")
    await Role.create(name="user")


async def get_roles():
    roles = await Role.query.gino.all()
    return [role.to_dict() for role in roles]


async def get_role(role_id: int):
    role = await Role.get(role_id)
    if not role:
        raise HTTPException(status_code=404, detail="Role not found")
    return role.to_dict()


async def create_role(role: RoleCreateRequest):
    role = await Role.create(name=role.name)
    return role.to_dict()


async def remove_role(role_id: int):
    role = await Role.get(role_id)
    if not role:
        raise HTTPException(status_code=400, detail="Role not found")
    await role.delete()
    return {"message": "deleted"}


async def update_role(role_id: int, role_data: RoleUpdateRequest):
    role = await Role.get(role_id)
    await role.update(name=role_data.name,).apply()

    return role.to_dict()
