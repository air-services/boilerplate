from app.core.crud import CrudRouter

from .models import Field
from .relations import FieldCrudRelations
from .serializers import FieldSerializer
from .views import FieldView

fields_router = CrudRouter(
    model=Field,
    serializer=FieldSerializer,
    relations=FieldCrudRelations,
    view=FieldView,
    tags=["fields"],
    prefix="/api/v1/constructor/fields",
).get_router()
