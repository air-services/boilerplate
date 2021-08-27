import os

import jinja2
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel

from app.legacy.applications.models import Application
from app.legacy.data_types.models import DataType
from app.legacy.fields.models import Field


class ApplicationModel(BaseModel):
    id: int


def upperstring(input):
    return input.upper()


templates = Jinja2Templates(
    directory=os.path.join(
        os.path.abspath("."),
        "app/constructor/applications/views",
    )
)


def configure_field(field):
    field_config = [f"db.{field.data_type.name}"]
    if field.is_index:
        field_config.append("index=True")
    if field.is_primary_key:
        field_config.append("primary_key=True")
    if field.foreign_key_id:
        foreign_key = field.foreign_key
        field_config.append(
            f'db.ForeignKey("{foreign_key.application.table_name}.{foreign_key.name}")'
        )
    field_str_config = ", ".join(field_config)
    print(field_str_config)
    return f"db.Column({field_str_config})"


templates.env.filters["configure_field"] = configure_field


def to_model_format_name(snake_str):
    components = snake_str.split("_")
    return components[0].title() + "".join(
        symbol.title() for symbol in components[1:]
    )


class ApplicationGenerate:
    async def get_fields(self, application_id):
        fields = await Field.query.where(
            Field.application_id == application_id
        ).gino.all()

        for field in fields:
            data_type = await DataType.get(field.data_type_id)
            field.data_type = data_type

            if field.foreign_key_id:
                foreign_key = await Field.get(field.foreign_key_id)
                foreign_key.application = await Application.get(
                    foreign_key.application_id
                )
                field.foreign_key = foreign_key

        return fields

    async def generate_files(self, application: ApplicationModel):
        application = await Application.get(application.id)
        fields = await self.get_fields(application.id)
        app_path = os.path.join(
            os.path.abspath("."),
            "app/constructor/build/",
            application.table_name,
        )
        if not os.path.exists(app_path):
            os.mkdir(app_path)

        template = templates.get_template("model_template.jinja2")

        with open(os.path.join(app_path, "models.py"), "w") as models_file:
            models_file.write(
                template.render(
                    {
                        "name": to_model_format_name(application.table_name),
                        "fields": fields,
                    },
                )
            )

        return {"message": {"applicationID": application.id}}
