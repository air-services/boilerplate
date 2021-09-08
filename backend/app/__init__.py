from fastapi import FastAPI
from starlette.config import Config

from app.constructor.applications.crud import applications_crud
from app.constructor.icons.crud import icons_crud
from app.constructor.modules.crud import modules_crud
from app.constructor.serializers.crud import serializers_crud
from app.constructor.tables.crud import tables_crud
from app.constructor.tables.fields.crud import tables_fields_crud
from app.core.database import db

config = Config(".env")
app = FastAPI()

app.include_router(applications_crud.router)
app.include_router(modules_crud.router)
app.include_router(serializers_crud.router)
app.include_router(tables_crud.router)
app.include_router(tables_fields_crud.router)
app.include_router(icons_crud.router)


@app.on_event("startup")
async def startup():
    engine = await db.set_bind(config("DATABASE_URL", cast=str, default=""))
    db.bind = engine
