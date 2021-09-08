from typing import List

from pydantic import BaseModel
from sqlalchemy.dialects.postgresql import insert

from ..modules.models import Module
from .models import Application


class ApplicationModuleQuery(BaseModel):
    name: str
    icon_id: int
    url: str
    api: str


class ApplicationQuery(BaseModel):
    name: str
    description: str
    url: str
    icon_id: int
    modules: List[ApplicationModuleQuery]


async def create_application(application_query: ApplicationQuery):
    application = await Application.create(
        name=application_query.name,
        description=application_query.description,
        icon_id=application_query.icon_id,
        url=application_query.url,
    )
    values = [
        {**application_module.dict(), "application_id": application.id}
        for application_module in application_query.modules
    ]

    await insert(Module).values(values).gino.scalar()
    return {"message": "success"}
