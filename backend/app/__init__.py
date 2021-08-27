from fastapi import FastAPI
from starlette.config import Config

from app.constructor.applications.router import applications_router
from app.constructor.data_types.router import data_types_router
from app.constructor.fields.router import fields_router
from app.core.database import db
from app.dev.router import dev_router

config = Config(".env")
app = FastAPI()

app.include_router(fields_router)
app.include_router(data_types_router)
app.include_router(applications_router)
app.include_router(dev_router)


def register_router():
    return app


@app.on_event("startup")
async def startup():
    engine = await db.set_bind(config("DATABASE_URL", cast=str, default=""))
    db.bind = engine

