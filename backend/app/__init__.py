from fastapi import FastAPI
from starlette.config import Config

from app.core.database import db

config = Config(".env")
app = FastAPI()


from app.account.router import account_router
from app.users.router import roles_router, users_router

app.include_router(users_router)
app.include_router(roles_router)

app.include_router(account_router)


@app.on_event("startup")
async def startup():
    engine = await db.set_bind(config("DATABASE_URL", cast=str, default=""))
    db.bind = engine
