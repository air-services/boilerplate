from app.core.database import db


class Module(db.Model):
    __tablename__ = "modules"

    id = db.Column(db.Integer, primary_key=True, index=True)
    application_id = db.Column(db.Integer, db.ForeignKey("applications.id"))
    name = db.Column(db.String)
    url = db.Column(db.String)
    api = db.Column(db.String)
    icon_id = db.Column(db.Integer, db.ForeignKey("icons.id"))
