from typing import Optional

from app.users.models import Role, User, UsersRoles
from fastapi import HTTPException
from pydantic import BaseModel


class UserBase(BaseModel):
    email: str
    is_active: bool


class UserCreate(UserBase):
    pass


class GetUsersResponseModel(BaseModel):
    id: int
    email: str
    first_name: Optional[str]
    last_name: Optional[str]
    patronymic: Optional[str]
    is_active: Optional[bool]


class UserUpdateRequestModel(BaseModel):
    email: str
    first_name: Optional[str]
    last_name: Optional[str]
    patronymic: Optional[str]
    is_active: Optional[bool]


async def mock_users_and_roles():
    await User.create(email="user@mail.com", hashed_password="password")
    await Role.create(name="superuser")
    await UsersRoles.create(user_id=1, role_id=1)


async def get_users():
    query = User.outerjoin(UsersRoles).outerjoin(Role).select()
    users = (
        await query.order_by(User.id)
        .gino.load(
            User.distinct(User.id).load(add_role=Role.distinct(Role.id))
        )
        .all()
    )

    return [user.to_dict() for user in users]


async def get_user(user_id: int):
    user = await User.get(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user.to_dict()


async def create_user(user: UserCreate):
    user = await User.create(
        email=user.email, hashed_password=user.hashed_password
    )
    return user.to_dict()


async def remove_user(user_id: int):
    user = await User.get(user_id)
    if not user:
        raise HTTPException(status_code=400, detail="User not found")
    await user.delete()
    return {"message": "deleted"}


async def update_user(user_id: int, user_data: UserUpdateRequestModel):
    user = await User.get(user_id)
    await user.update(
        email=user_data.email,
        first_name=user_data.first_name,
        last_name=user_data.last_name,
        patronymic=user_data.patronymic,
        is_active=user_data.is_active,
    ).apply()

    return user.to_dict()
