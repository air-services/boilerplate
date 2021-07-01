from app.core.crud import CrudView
from app.projects.models import Project


class ProjectView(CrudView):
    model = Project
