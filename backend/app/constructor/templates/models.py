from app.core.database import db


class Template(db.Model):
    __tablename__ = "constructor_templates"

    id = db.Column(db.Integer, primary_key=True, index=True)
    name = db.Column(db.String)
    description = db.Column(db.String)
