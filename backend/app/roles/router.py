from app.core.crud import CrudRouter

from .models import Role
from .serializers import RoleSerializer
from .views import RoleView

roles_router = CrudRouter(
    serializer=RoleSerializer,
    view=RoleView,
    model=Role,
    prefix="/api/v1/roles",
    tags=["roles"],
    responses={404: {"description": "Not found"}},
).get_router()
