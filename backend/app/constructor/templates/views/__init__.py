from app.core.crud import CrudView

from .crud import UpdateNested
from .generate import TemplateGenerate


class TemplateView(UpdateNested, CrudView, TemplateGenerate):
    pass
