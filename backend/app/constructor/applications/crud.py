from app.core.crud import Crud, CrudView

from .models import Application
from .serializers import ApplicationSerializer
from .views import create_application

applications_crud = Crud(
    model=Application,
    serializer=ApplicationSerializer,
    view=CrudView,
    prefix="/api/v1/applications",
    tags=["applications"],
)
applications_crud.router.add_api_route(
    "/create", create_application, methods=["POST"]
)
