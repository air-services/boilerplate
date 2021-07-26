from fastapi import Depends, FastAPI
from starlette.config import Config

from app.offers.router import offers_router

config = Config(".env")
app = FastAPI()

app.include_router(offers_router)

from app.core.database import SessionLocal, engine

# @app.on_event("startup")
# async def startup():
#     engine = await db.set_bind(config("DATABASE_URL", cast=str, default=""))
#     db.bind = engine
