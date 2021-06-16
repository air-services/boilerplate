# import pytest
# from app import app
# from app.core.database import db
# from starlette.config import Config
#
# config = Config(".env")
#
#
# @pytest.yield_fixture
# def app():
#     engine = db.set_bind(config("DATABASE_URL", cast=str, default=""))
#     db.bind = engine
#     yield app
