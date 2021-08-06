from app.core.crud import CrudRouter, CrudSerializer
from app.projects.models import Dashboard
from app.projects.serlializers import DashboardSerializer
from app.projects.views import DashboardView

dashboards_router = CrudRouter(
    serializer=DashboardSerializer,
    view=DashboardView,
    model=Dashboard,
    prefix="/api/v1/dashboards",
    tags=["dashboards"],
    responses={404: {"description": "Not found"}},
).get_router()
