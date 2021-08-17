from app.core.crud import CrudRouter

from .models import Template
from .relations import TemplateCrudRelations
from .serializers import TemplateSerializer
from .views import TemplateView

templates_router = CrudRouter(
    model=Template,
    serializer=TemplateSerializer,
    view=TemplateView,
    relations=TemplateCrudRelations,
    prefix="/api/v1/constructor/templates",
    tags=["templates"],
).get_router()
