from sqlalchemy import UniqueConstraint

from app.core.database import db


class Field(db.Model):
    __tablename__ = "constructor_fields"
    __table_args__ = (
        UniqueConstraint(
            "name", "application_id", name="application field unique"
        ),
    )

    id = db.Column(db.Integer, primary_key=True, index=True)
    name = db.Column(db.String)
    description = db.Column(db.String)

    data_type_id = db.Column(
        db.Integer, db.ForeignKey("constructor_data_types.id")
    )

    application_id = db.Column(
        db.Integer, db.ForeignKey("constructor_applications.id")
    )

    foreign_key_id = db.Column(
        db.Integer, db.ForeignKey("constructor_fields.id")
    )

    size = db.Column(db.Integer)
