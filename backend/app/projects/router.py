from app.core.crud import CrudRouter, CrudSerializer

from .models import Project
from .relations import ProjectCrudRelations
from .serializers import ProjectSerializer
from .views import ProjectView

projects_router = CrudRouter(
    serializer=ProjectSerializer,
    view=ProjectView,
    model=Project,
    relations=ProjectCrudRelations,
    prefix="/api/v1/projects",
    tags=["projects"],
    responses={404: {"description": "Not found"}},
).get_router()
