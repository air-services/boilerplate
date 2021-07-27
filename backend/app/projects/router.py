from app.core.crud import CrudRouter, CrudSerializer
from app.projects.serlializers import ProjectSerializer

from .models import Project
from .views import ProjectView

projects_router = CrudRouter(
    serializer=ProjectSerializer,
    view=ProjectView(
        model=Project, serializer=ProjectSerializer, relations=[]
    ),
    prefix="/api/v1/projects",
    tags=["projects"],
    responses={404: {"description": "Not found"}},
).get_router()
