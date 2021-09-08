from app.core.database import db


class Icon(db.Model):
    __tablename__ = "icons"

    id = db.Column(db.Integer, primary_key=True, index=True)
    name = db.Column(db.String)
