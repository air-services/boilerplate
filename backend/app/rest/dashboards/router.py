from app.core.crud import CrudRouter, CrudSerializer

from .models import Dashboard
from .relations import DashboardCrudRelations
from .serializers import DashboardSerializer
from .views import DashboardView

dashboards_router = CrudRouter(
    serializer=DashboardSerializer,
    view=DashboardView,
    model=Dashboard,
    relations=DashboardCrudRelations,
    prefix="/api/v1/dashboards",
    tags=["dashboards"],
    responses={404: {"description": "Not found"}},
).get_router()
