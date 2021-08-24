from app.core.crud import CrudView

from .configure import Configure
from .crud import UpdateNested
from .generate import ApplicationGenerate


class ApplicationView(UpdateNested, CrudView, ApplicationGenerate, Configure):
    pass
