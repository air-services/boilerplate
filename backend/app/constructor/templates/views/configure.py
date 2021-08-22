import datetime
import os

from pydantic import BaseModel
from sqlalchemy import types

from app.constructor.data_types.models import DataType
from app.constructor.fields.models import Field
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
        print("configure")
        template = await self.model.get(template.id)
        data_types = await DataType.query.gino.all()
        data_types = {data_type.id: data_type for data_type in data_types}

        fields = [
            {
                **field.to_dict(),
                "data_type": data_types.get(field.data_type_id).name,
            }
            for field in await Field.query.where(
                Field.template_id == template.id
            ).gino.all()
        ]
        model_class_fields = {
            field.get("name"): db.Column(getattr(db, field.get("data_type")))
            for field in fields
        }

        model_class = type(
            "ModelClass",
            (db.Model,),
            {
                "__tablename__": template.name,
                # "__table_args__ ": {"extend_existing": True},
                **model_class_fields,
            },
        )

        now_date_time = datetime.datetime.now().strftime("%Y_%m_%d_%H_%M_%S")
        generate_migrations(f"Update {template.name} {now_date_time}")
        return {"message": {"templateID": template.id}}
