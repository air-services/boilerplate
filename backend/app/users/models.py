from app.core.database import db


class User(db.Model):
    __tablename__ = "users"

    def __init__(self, **kw):
        super().__init__(**kw)
        self._roles = set()
        self._projects = set()

    id = db.Column(db.Integer, primary_key=True, index=True)
    email = db.Column(db.String, unique=True, index=True)
    first_name = db.Column(db.String, default=str)
    last_name = db.Column(db.String, default=str)
    patronymic = db.Column(db.String, default=str)
    avatar = db.Column(db.String, default=str)
    hashed_password = db.Column(db.String, default=str)
    is_active = db.Column(db.Boolean, default=True)

    @property
    def roles(self):
        return self._roles

    def add_role(self, role):
        self._roles.add(role)

    @property
    def projects(self):
        return self._projects

    def add_project(self, project):
        self._projects.add(project)
