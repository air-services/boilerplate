import asyncio
from functools import wraps

from app.core.database import db
from starlette.config import Config

config = Config(".env")


async def init_gino():
    engine = await db.set_bind(config("DATABASE_URL", cast=str, default=""))
    db.bind = engine


def coro(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        return asyncio.run(f(*args, **kwargs))

    return wrapper
