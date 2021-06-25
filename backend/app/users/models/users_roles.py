from app.core.database import db


class UsersRoles(db.Model):
    __tablename__ = "users_roles"

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    role_id = db.Column(db.Integer, db.ForeignKey("roles.id"))
