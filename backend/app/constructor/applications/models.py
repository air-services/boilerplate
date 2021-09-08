from app.core.database import db


class Application(db.Model):
    __tablename__ = "applications"

    id = db.Column(db.Integer, primary_key=True, index=True)
    name = db.Column(db.String, unique=True)
    description = db.Column(db.String)
    url = db.Column(db.String)
    icon_id = db.Column(db.Integer, db.ForeignKey("icons.id"))
