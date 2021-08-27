from app.core.database import db


class Table(db.Model):
    __tablename__ = "tables"

    id = db.Column(db.Integer, primary_key=True, index=True)
    name = db.Column(db.String)
    module_id = db.Column(db.Integer, db.ForeignKey("modules.id"))
