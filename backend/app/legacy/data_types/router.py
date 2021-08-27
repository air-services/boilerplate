from app.core.crud import CrudRouter

from .models import DataType
from .serializers import DataTypeSerializer
from .views import DataTypeView

data_types_router = CrudRouter(
    model=DataType,
    serializer=DataTypeSerializer,
    view=DataTypeView,
    prefix="/api/v1/constructor/data-types",
    tags=["data-types"],
).get_router()
