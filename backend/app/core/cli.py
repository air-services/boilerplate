import asyncio
import os
from functools import wraps

from starlette.config import Config

from alembic import command
from alembic.config import Config as DbConfig
from app.core.database import db

config = Config(".env")


async def init_gino():
    engine = await db.set_bind(config("DATABASE_URL", cast=str, default=""))
    db.bind = engine


def coro(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        return asyncio.run(f(*args, **kwargs))

    return wrapper


def configure_alembic():
    file_config = os.path.join(os.path.abspath("."), "alembic.ini")
    script_location = os.path.join(os.path.abspath("."), "alembic")
    db_url = config("DATABASE_URL", cast=str, default="")

    alembic_cfg = DbConfig(file_=file_config)
    alembic_cfg.set_main_option("script_location", script_location)
    alembic_cfg.set_main_option("sqlalchemy.url", db_url)

    return alembic_cfg


alembic_config = configure_alembic()


def apply_migrations():
    command.upgrade(alembic_config, "head")


def generate_migrations(message):
    command.revision(alembic_config, autogenerate=True, message=message)


async def reset_database():
    await init_gino()
    tables = [
        "users_roles",
        "projects_users",
        "users",
        "roles",
        "dashboards",
        "projects",
        "constructor_fields",
        "constructor_templates",
        "constructor_data_types",
        "cards",
        "icons",
        "alembic_version",
    ]
    for table in tables:
        query = db.text(f"drop table if exists  {table} ")
        await db.first(query)
