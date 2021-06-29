from app.core.database import db


class ProjectsUsers(db.Model):
    __tablename__ = "projects_users"

    project_id = db.Column(db.Integer, db.ForeignKey("projects.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
