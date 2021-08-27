from app.core.database import db


class Project(db.Model):
    __tablename__ = "projects"

    def __init__(self, **kw):
        super().__init__(**kw)
        self._roles = set()
        self._dashboards = set()

    id = db.Column(db.Integer, primary_key=True, index=True)
    name = db.Column(db.String, unique=True, index=True)

    @property
    def users(self):
        return self._users

    def add_user(self, user):
        self._users.add(user)

    @property
    def dashboards(self):
        return self._dashboards

    def add_dashboard(self, dashboard):
        self._dashboards.add(dashboard)
