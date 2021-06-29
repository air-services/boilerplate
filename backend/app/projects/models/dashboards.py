from app.core.database import db


class Dashboard(db.Model):
    __tablename__ = "dashboards"

    def __init__(self, **kw):
        super().__init__(**kw)
        self._roles = set()

    id = db.Column(db.Integer, primary_key=True, index=True)
    name = db.Column(db.String, unique=True, index=True)
    project_id = db.Column(db.Integer, db.ForeignKey("projects.id"))

    _project = None

    @property
    def project(self):
        return self._project

    @project.setter
    def project(self, value):
        self._project = value
