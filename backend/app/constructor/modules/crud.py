from app.core.crud import Crud, CrudView

from .models import Module
from .serializers import ModuleSerializer

modules_crud = Crud(
    model=Module,
    serializer=ModuleSerializer,
    view=CrudView,
    prefix="/api/v1/modules",
    tags=["modules"],
)
