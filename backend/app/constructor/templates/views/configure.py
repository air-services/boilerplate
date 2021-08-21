import os

from pydantic import BaseModel
from sqlalchemy import types

from app.core.cli import generate_migrations
from app.core.database import db

ALEMBIC_DATA_TYPES = {""}


class TemplateModel(BaseModel):
    id: int


def to_model_format_name(snake_str):
    components = snake_str.split("_")
    return components[0].title() + "".join(
        symbol.title() for symbol in components[1:]
    )


from app.constructor.data_types.models import DataType


class Configure:
    async def configure(self, template: TemplateModel):
        template = await self.model.get(template.id)
        await template.migrate()
        return {"message": {"templateID": template.id}}
