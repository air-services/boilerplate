from app.core.crud import Crud, CrudView

from .models import Table
from .serializers import TableSerializer

tables_crud = Crud(
    model=Table,
    serializer=TableSerializer,
    view=CrudView,
    prefix="/api/v1/tables",
    tags=["tables"],
)
