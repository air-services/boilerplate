from app.users.models import User
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel


class SignUpAccount(BaseModel):
    email: str
    password: str


account_router = APIRouter(
    prefix="/api/v1/account",
    tags=["account"],
    responses={404: {"description": "Not found"}},
)


@account_router.post("/signup")
async def signup(account: SignUpAccount):
    existing_user = await User.query.where(
        User.email == account.email
    ).gino.first()
    if existing_user:
        raise HTTPException(
            status_code=400, detail={"email": "EMAIL_ALREADY_EXIST"}
        )

    await User.create(email=account.email, hashed_password=account.password)
    return {"message": "success"}
