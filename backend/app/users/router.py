from app.core.crud import CrudRouter
from app.users.models import User
from app.users.relations import UserCrudRelations
from app.users.serializers import UserSerializer
from app.users.views import UsersView

users_router = CrudRouter(
    model=User,
    serializer=UserSerializer,
    relations=UserCrudRelations,
    view=UsersView,
    prefix="/api/v1/users",
    tags=["users"],
    responses={404: {"description": "Not found"}},
).get_router()
