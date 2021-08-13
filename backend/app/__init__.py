from fastapi import FastAPI
from starlette.config import Config

from app.account.router import account_router
from app.core.database import db
from app.dashboards.router import dashboards_router
from app.projects.router import projects_router
from app.roles.router import roles_router
from app.users.router import users_router

config = Config(".env")
app = FastAPI()


app.include_router(users_router)
app.include_router(roles_router)
app.include_router(account_router)

app.include_router(projects_router)
app.include_router(dashboards_router)

from app.users.serializers import UserSerializer


@app.get("/create-user")
async def create_user():
    return {"message": "Hello World"}


@app.on_event("startup")
async def startup():
    engine = await db.set_bind(config("DATABASE_URL", cast=str, default=""))
    db.bind = engine
