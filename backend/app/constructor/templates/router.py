from app.core.crud import CrudRouter

from .models import Template
from .relations import TemplateCrudRelations
from .serializers import TemplateSerializer
from .views import TemplateView

template_router_fabric = CrudRouter(
    model=Template,
    serializer=TemplateSerializer,
    view=TemplateView,
    relations=TemplateCrudRelations,
    prefix="/api/v1/constructor/templates",
    tags=["templates"],
)

# custom views
templates_router = template_router_fabric.get_router()
# templates_router.add_api_route(
#     "/generate",
#     template_router_fabric.view.generate_template,
#     methods=["POST"],
# )

templates_router.add_api_route(
    "/generate",
    template_router_fabric.view.configure,
    methods=["POST"],
)
