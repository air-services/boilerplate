import asyncio

import pytest
from starlette.config import Config

from app.core.database import db
from app.rest.users.models import User

config = Config(".env")


@pytest.fixture(autouse=True)
async def app_db():
    engine = await db.set_bind(
        config("TEST_DATABASE_URL", cast=str, default="")
    )
    db.bind = engine
    await db.gino.drop_all()
    await db.gino.create_all()
    return db


@pytest.fixture()
async def mock_user():
    user = await User.create(
        email="test@mail.com",
        hashed_password="some_secret_password",
        is_active=False,
    )

    return user


@pytest.fixture
def event_loop():
    yield asyncio.get_event_loop()


def pytest_sessionfinish(session, exitstatus):
    asyncio.get_event_loop().close()
