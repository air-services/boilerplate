from app.core.crud import CrudRouter
from app.users.models import User
from app.users.relations import UserCrudRelations
from app.users.serializers import UserSerializer
from app.users.views import AlternativeUserView, UsersView

users_router = CrudRouter(
    serializer=UserSerializer,
    view=AlternativeUserView(
        model=User, serializer=UserSerializer, relations=UserCrudRelations
    ),
    prefix="/api/v1/users",
    tags=["users"],
    responses={404: {"description": "Not found"}},
).get_router()
