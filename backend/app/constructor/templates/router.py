from app.core.crud import CrudRouter

from .models import Template
from .serializers import TemplateSerializer
from .views import TemplateView

templates_router = CrudRouter(
    model=Template,
    serializer=TemplateSerializer,
    view=TemplateView,
    prefix="/api/v1/constructor/templates",
    tags=["templates"],
).get_router()
