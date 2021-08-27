from app.core.database import db


class Application(db.Model):
    __tablename__ = "constructor_applications"

    id = db.Column(db.Integer, primary_key=True, index=True)
    name = db.Column(db.String)
    table_name = db.Column(db.String)
    api_url = db.Column(db.String)
    description = db.Column(db.String)
