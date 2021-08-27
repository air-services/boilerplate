from pydantic import BaseModel

from app.core.database import db
from app.legacy.applications.models import Application
from app.legacy.data_types.models import DataType
from app.legacy.fields.models import Field


class ApplicationModel(BaseModel):
    id: int


class ConfigureApplicationModel:
    def __init__(self, application):
        self.application = application

    async def get_field_args(self, field):
        if field.get("foreign_key_id"):
            foreign_field = await Field.get(field.get("foreign_key_id"))
            application = await Application.get(foreign_field.application_id)
            table = application.table_name
            key = foreign_field.name
            return [db.ForeignKey(f"{table}.{key}")]

        return []

    async def get_field_kwargs(self, field):
        kwargs = {}
        if field.get("is_primary_key"):
            kwargs["primary_key"] = True

        if field.get("is_index"):
            kwargs["index"] = True

        return kwargs

    async def configure(self):
        application = self.application
        data_types = await DataType.query.gino.all()
        data_types = {data_type.id: data_type for data_type in data_types}

        fields = [
            {
                **field.to_dict(),
                "data_type": data_types.get(field.data_type_id).name,
            }
            for field in await Field.query.where(
                Field.application_id == application.id
            ).gino.all()
        ]

        model_class_fields = {
            field.get("name"): db.Column(
                getattr(db, field.get("data_type")),
                *(await self.get_field_args(field)),
                **(await self.get_field_kwargs(field)),
            )
            for field in fields
        }

        return type(
            application.name,
            (db.Model,),
            {
                "__tablename__": application.table_name,
                "__table_args__": {"extend_existing": True},
                **model_class_fields,
            },
        )
