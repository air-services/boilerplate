from sqlalchemy import UniqueConstraint

from app.core.database import db


class Field(db.Model):
    __tablename__ = "constructor_fields"
    __table_args__ = (
        UniqueConstraint("name", "template_id", name="template field unique"),
    )

    id = db.Column(db.Integer, primary_key=True, index=True)
    name = db.Column(db.String)
    description = db.Column(db.String)

    data_type_id = db.Column(
        db.Integer, db.ForeignKey("constructor_data_types.id")
    )

    template_id = db.Column(
        db.Integer, db.ForeignKey("constructor_templates.id")
    )

    size = db.Column(db.Integer)
