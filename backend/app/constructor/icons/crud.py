from app.core.crud import Crud, CrudView

from .models import Icon
from .serializers import IconSerializer

icons_crud = Crud(
    model=Icon,
    serializer=IconSerializer,
    view=CrudView,
    prefix="/api/v1/icons",
    tags=["icons"],
)
