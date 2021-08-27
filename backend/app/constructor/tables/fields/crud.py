from app.core.crud import Crud, CrudView

from .models import TableField
from .serializers import TableFieldSerializer

tables_fields_crud = Crud(
    model=TableField,
    serializer=TableFieldSerializer,
    view=CrudView,
    prefix="/api/v1/tables_fields",
    tags=["tables_fields"],
)
