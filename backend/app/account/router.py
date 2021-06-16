from typing import Optional

import bcrypt
from app.core.auth import check_access_token, generate_jwt
from app.users.models import User
from fastapi import APIRouter, Header, HTTPException
from pydantic import BaseModel
from starlette.config import Config

config = Config(".env")
secret = config("SECRET_KEY")
salt = bcrypt.gensalt()


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

    hashed_password = bcrypt.hashpw(
        account.password.encode("utf-8"), salt
    ).decode("utf-8")

    user = await User.create(
        email=account.email, hashed_password=hashed_password
    )
    token = generate_jwt({"id": user.id, "email": user.email})

    return {
        "id": user.to_dict().get("id"),
        "email": user.to_dict().get("email"),
        "token": token,
    }


@account_router.get("/load")
async def load(access_token: Optional[str] = Header(None)):
    account_jwt = check_access_token(access_token)
    if not account_jwt:
        raise HTTPException(status_code=400, detail={"message": "NOT_AUTH"})

    account = await User.get(account_jwt.get("id"))
    return {
        "status": "success",
        "account": {"email": account.email, "id": account.id},
    }
