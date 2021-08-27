from typing import List

from pydantic import BaseModel

from app.core.crud import CrudSerializer
from app.legacy.applications.models import Application
from app.legacy.data_types.models import DataType
from app.legacy.fields.models import Field


class ConfigureApplicationSerializer:
    def __init__(self, application: Application):
        self.application = application

    async def get_field_serializer(self, field):
        type_map = {
            "Integer": int,
            "String": str,
            "Date": str,
            "Boolean": bool,
        }
        return type_map.get(field.get("data_type"))

    async def configure(self):
        data_types = await DataType.query.gino.all()
        data_types = {data_type.id: data_type for data_type in data_types}

        fields = [
            {
                **field.to_dict(),
                "data_type": data_types.get(field.data_type_id).name,
            }
            for field in await Field.query.where(
                Field.application_id == self.application.id
            ).gino.all()
        ]

        serializer_class_fields = {
            field.get("name"): await self.get_field_serializer(field)
            for field in fields
            if field.get("name") != "id"
        }

        base_serializer = type(
            f"{self.application.name}BaseSerializer",
            (BaseModel,),
            {
                "__annotations__": {**serializer_class_fields},
            },
        )

        extended_serializer = type(
            f"{self.application.name}ExtendedSerializer",
            (BaseModel,),
            {
                "__annotations__": {
                    "id": int,
                    **serializer_class_fields,
                }
            },
        )

        remove_serializer = type(
            f"{self.application.name}ExtendedSerializer",
            (BaseModel,),
            {
                "__annotations__": {"id": int},
            },
        )

        class ApplicationListSerializer(BaseModel):
            count: int
            items: List[extended_serializer]

        class ApplicationCrudSerializer(CrudSerializer):
            get_list_response_model = ApplicationListSerializer
            get_item_response_model = extended_serializer
            update_item_request_model = base_serializer
            update_item_response_model = extended_serializer
            create_item_request_model = base_serializer
            create_item_response_model = extended_serializer
            remove_item_response_model = remove_serializer

        return ApplicationCrudSerializer
