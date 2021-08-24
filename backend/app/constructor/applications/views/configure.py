import datetime

from pydantic import BaseModel

from app.constructor.fields.models import Field
from app.core.cli import generate_migrations
from app.core.database import db

ALEMBIC_DATA_TYPES = {""}


class ApplicationModel(BaseModel):
    id: int


def to_model_format_name(snake_str):
    components = snake_str.split("_")
    return components[0].title() + "".join(
        symbol.title() for symbol in components[1:]
    )


from app.constructor.data_types.models import DataType


class Configure:
    async def configure(self, application: ApplicationModel):
        application = await self.model.get(application.id)
        data_types = await DataType.query.gino.all()
        data_types = {data_type.id: data_type for data_type in data_types}
        now_date_time = datetime.datetime.now().strftime("%Y_%m_%d_%H_%M_%S")

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
            field.get("name"): db.Column(getattr(db, field.get("data_type")))
            for field in fields
        }

        type(
            "ModelClass",
            (db.Model,),
            {
                "__tablename__": application.name,
                "__table_args__": {"extend_existing": True},
                **model_class_fields,
            },
        )
        print("success")
        generate_migrations(f"Update {application.name} {now_date_time}")
        return {"message": {"applicationID": application.id}}
