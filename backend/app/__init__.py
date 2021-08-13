from fastapi import FastAPI
from starlette.config import Config

from app.account.router import account_router
from app.core.database import db
from app.projects.routers import dashboards_router, projects_router
from app.users.routers import roles_router, users_router

config = Config(".env")
app = FastAPI()


app.include_router(users_router)
app.include_router(roles_router)
app.include_router(account_router)

app.include_router(projects_router)
app.include_router(dashboards_router)

from app.users.serializers import UserSerializer


@app.post("/api/cool")
async def cool(data: UserSerializer.update_item_request_model):
    print(data)
    return {"message": "Hello World"}


@app.get("/create-user")
async def create_user():
    return {"message": "Hello World"}


@app.on_event("startup")
async def startup():
    engine = await db.set_bind(config("DATABASE_URL", cast=str, default=""))
    db.bind = engine
