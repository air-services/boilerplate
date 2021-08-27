from app.core.crud import CrudView

from .crud import UpdateNested
from .generate_files import ApplicationGenerate


class ApplicationView(UpdateNested, CrudView, ApplicationGenerate):
    pass
