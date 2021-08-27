from app.core.crud import Crud, CrudView

from .models import Application
from .serializers import ApplicationSerializer

applications_crud = Crud(
    model=Application,
    serializer=ApplicationSerializer,
    view=CrudView,
    prefix="/api/v1/applications",
    tags=["applications"],
)
