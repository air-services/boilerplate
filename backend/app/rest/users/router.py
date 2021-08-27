from app.core.crud import CrudRouter
from app.rest.users.models import User
from app.rest.users.relations import UserCrudRelations
from app.rest.users.serializers import UserSerializer
from app.rest.users.views import UsersView

users_router = CrudRouter(
    model=User,
    serializer=UserSerializer,
    relations=UserCrudRelations,
    view=UsersView,
    prefix="/api/v1/users",
    tags=["users"],
    responses={404: {"description": "Not found"}},
).get_router()
