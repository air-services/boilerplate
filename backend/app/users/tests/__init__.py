import pytest
from starlette.config import Config

from app import app
from app.core.database import db

config = Config(".env")


@pytest.yield_fixture
def app():
    engine = db.set_bind(config("DATABASE_URL", cast=str, default=""))
    db.bind = engine
    yield app
