from fastapi import FastAPI
from starlette.config import Config

from app.account.router import account_router
from app.constructor.data_types.router import data_types_router
from app.constructor.fields.router import fields_router
from app.constructor.templates.router import templates_router
from app.core.database import db
from app.dashboards.router import dashboards_router
from app.projects.router import projects_router
from app.roles.router import roles_router
from app.statistic.router import card_router, icon_router
from app.users.router import users_router

config = Config(".env")
app = FastAPI()


app.include_router(users_router)
app.include_router(roles_router)
app.include_router(account_router)

app.include_router(projects_router)
app.include_router(dashboards_router)
app.include_router(card_router)
app.include_router(icon_router)
app.include_router(data_types_router)
app.include_router(fields_router)
app.include_router(templates_router)


@app.on_event("startup")
async def startup():
    engine = await db.set_bind(config("DATABASE_URL", cast=str, default=""))
    db.bind = engine
