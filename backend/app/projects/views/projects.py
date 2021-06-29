from app.core.crud import CrudList
from app.projects.models import Project
from fastapi import HTTPException
from pydantic import BaseModel


class ProjectModel(BaseModel):
    id: int
    name: str


class ProjectModels:
    class GetModel(BaseModel):
        int: int
        name: str

    class UpdateModel(BaseModel):
        name: str


class ProjectsCrud(CrudList):
    model = Project
    create_item_request_model = ProjectModels.UpdateModel
    update_item_request_model = ProjectModels.UpdateModel


projects_crud = ProjectsCrud()
