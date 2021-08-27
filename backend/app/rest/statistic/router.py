from app.core.crud import CrudRouter

from .models import Card, Icon
from .relations import CardCrudRelations
from .serializers import CardSerializer, IconSerializer
from .views import CardView, IconView

card_router = CrudRouter(
    serializer=CardSerializer,
    view=CardView,
    model=Card,
    relations=CardCrudRelations,
    prefix="/api/v1/cards",
    tags=["cards"],
    responses={404: {"description": "Not found"}},
).get_router()


icon_router = CrudRouter(
    serializer=IconSerializer,
    view=IconView,
    model=Icon,
    prefix="/api/v1/icons",
    tags=["icons"],
    responses={404: {"description": "Not found"}},
).get_router()
