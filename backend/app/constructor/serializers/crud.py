from app.core.crud import Crud, CrudView

from .models import Serializer
from .serializers import SerializerSerializer

serializers_crud = Crud(
    model=Serializer,
    serializer=SerializerSerializer,
    view=CrudView,
    prefix="/api/v1/serializers",
    tags=["serializers"],
)
