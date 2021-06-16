from app.core.database import db
from app.users.models import User
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel


class UserBase(BaseModel):
    email: str
    hashed_password: str
    is_active: bool


class UserCreate(UserBase):
    pass


users_router = APIRouter(
    prefix="/api/v1/users",
    tags=["users"],
    responses={404: {"description": "Not found"}},
)


@users_router.get("/")
async def get_users():
    users = await db.all(User.query)
    return [user.to_dict() for user in users]


@users_router.get("/{id:int}")
async def get_user(id):
    user = await User.get(id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user.to_dict()


@users_router.post("/")
async def create_user(user: UserCreate):
    user = await User.create(
        email=user.email, hashed_password=user.hashed_password
    )
    return user.to_dict()


@users_router.delete("/{id:int}")
async def remove_user(id):
    user = await User.get(id)
    if not user:
        raise HTTPException(status_code=400, detail="User not found")
    await user.delete()
    return {"message": "deleted"}
