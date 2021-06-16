from app.core.database import db


class Role(db.Model):
    __tablename__ = "roles"
    id = db.Column(db.Integer, primary_key=True, index=True)
    name = db.Column(db.String, unique=True, index=True)


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True, index=True)
    email = db.Column(db.String, unique=True, index=True)
    hashed_password = db.Column(db.String)
    is_active = db.Column(db.Boolean, default=True)
