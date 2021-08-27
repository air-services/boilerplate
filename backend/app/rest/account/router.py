from typing import Optional

import bcrypt
from fastapi import APIRouter, Header, HTTPException
from pydantic import BaseModel
from starlette.config import Config

from app.core.auth import check_access_token, generate_jwt
from app.rest.users.models import User

config = Config(".env")
secret = config("SECRET_KEY")
salt = bcrypt.gensalt()


class SignUpAccount(BaseModel):
    email: str
    password: str


class LogInAccount(BaseModel):
    email: str
    password: str


class UpdateAccount(BaseModel):
    email: str
    first_name: str
    last_name: str
    patronymic: str


class UpdateAccountResponse(UpdateAccount):
    pass


class LoadAccountResponseModel(BaseModel):
    id: int
    email: str
    first_name: Optional[str]
    last_name: Optional[str]
    patronymic: Optional[str]


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


@account_router.get("/load", response_model=LoadAccountResponseModel)
async def load(access_token: Optional[str] = Header(None)):
    account_jwt = check_access_token(access_token)
    if not account_jwt:
        raise HTTPException(status_code=400, detail={"message": "NOT_AUTH"})

    if await User.query.where(User.id == account_jwt.get("id")).gino.first():
        account = await User.get(account_jwt.get("id"))

        return account.to_dict()
    else:
        raise HTTPException(
            status_code=400, detail={"message": "USER_NOT_FOUND"}
        )


@account_router.post("/login")
async def login(account: LogInAccount):
    user = await User.query.where(User.email == account.email).gino.first()

    if not user:
        raise HTTPException(
            status_code=400, detail={"email": "EMAIL_NOT_FOUND"}
        )

    log_success = bcrypt.checkpw(
        account.password.encode("utf-8"), user.hashed_password.encode("utf-8")
    )

    if not log_success:
        raise HTTPException(
            status_code=400, detail={"password": "PASSWORD_WRONG"}
        )
    token = generate_jwt({"id": user.id, "email": user.email})

    return {
        "id": user.to_dict().get("id"),
        "email": user.to_dict().get("email"),
        "token": token,
    }


@account_router.post("/update", response_model=UpdateAccountResponse)
async def update_account(
    account: UpdateAccount, access_token: Optional[str] = Header(None)
):
    account_jwt = check_access_token(access_token)
    if not account_jwt:
        raise HTTPException(status_code=400, detail={"message": "NOT_AUTH"})

    if await User.query.where(User.id == account_jwt.get("id")).gino.first():
        user = await User.get(account_jwt.get("id"))

        await user.update(
            email=account.email,
            first_name=account.first_name,
            last_name=account.last_name,
            patronymic=account.patronymic,
        ).apply()

        return user.to_dict()

    else:
        raise HTTPException(
            status_code=400, detail={"message": "USER_NOT_FOUND"}
        )
