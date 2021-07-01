from app.core.crud import CrudRouter
from app.users.models import User
from app.users.serializers import UserSerializer
from app.users.views import UsersView

users_router = CrudRouter(
    serializer=UserSerializer,
    view=UsersView(model=User, serializer=UserSerializer),
    prefix="/api/v1/users",
    tags=["users"],
    responses={404: {"description": "Not found"}},
).get_router()
