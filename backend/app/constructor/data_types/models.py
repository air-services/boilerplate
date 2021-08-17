from app.core.database import db


class DataType(db.Model):
    __tablename__ = "constructor_data_types"
    id = db.Column(db.Integer, primary_key=True, index=True)
    name = db.Column(db.String)
