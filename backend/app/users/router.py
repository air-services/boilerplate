from app.core.database import SessionLocal
from app.users.models import User
from fastapi import APIRouter
from pydantic import BaseModel
from sqlalchemy.orm import Session


class UserBase(BaseModel):
    email: str
    hashed_password: str
    is_active: bool


class UserCreate(UserBase):
    pass


router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={404: {"description": "Not found"}},
)


@router.get("/")
async def get_users():
    db = SessionLocal()
    users = db.query(User).all()
    return users


@router.post("/create")
def create_user(user: UserCreate):
    db = SessionLocal()
    fake_hashed_password = user.hashed_password + "notreallyhashed"
    db_user = User(email=user.email, hashed_password=fake_hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
