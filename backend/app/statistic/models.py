from app.core.database import db


class Card(db.Model):
    __tablename__ = "cards"

    id = db.Column(db.Integer, primary_key=True, index=True)
    title = db.Column(db.String, unique=True)
    value = db.Column(db.String)
    color = db.Column(db.String)
    icon_id = db.Column(db.Integer, db.ForeignKey("icons.id"))

    change = db.Column(db.String)
    change_title = db.Column(db.String)
    direction = db.Column(db.String)


class Icon(db.Model):
    __tablename__ = "icons"

    id = db.Column(db.Integer, primary_key=True, index=True)
    name = db.Column(db.String, unique=True, index=True)
