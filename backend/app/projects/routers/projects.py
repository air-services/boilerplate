from app.core.crud import CrudRouter, CrudSerializer
from app.projects.models import Project
from app.projects.relations import ProjectCrudRelations
from app.projects.serlializers import ProjectSerializer
from app.projects.views import ProjectView

projects_router = CrudRouter(
    serializer=ProjectSerializer,
    view=ProjectView,
    model=Project,
    relations=ProjectCrudRelations,
    prefix="/api/v1/projects",
    tags=["projects"],
    responses={404: {"description": "Not found"}},
).get_router()
