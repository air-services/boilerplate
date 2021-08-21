from app.core.crud import CrudView

from .configure import Configure
from .crud import UpdateNested
from .generate import TemplateGenerate


class TemplateView(UpdateNested, CrudView, TemplateGenerate, Configure):
    pass
