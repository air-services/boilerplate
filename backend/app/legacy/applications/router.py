from app.core.crud import CrudRouter

from .models import Application
from .relations import ApplicationCrudRelations
from .serializers import ApplicationSerializer
from .views import ApplicationView

applications_router_fabric = CrudRouter(
    model=Application,
    serializer=ApplicationSerializer,
    view=ApplicationView,
    relations=ApplicationCrudRelations,
    prefix="/api/v1/constructor/applications",
    tags=["applications"],
)

# custom views
applications_router = applications_router_fabric.get_router()
applications_router.add_api_route(
    "/generate-files",
    applications_router_fabric.view.generate_files,
    methods=["POST"],
)
