import enum

from app.core.database import db


class TableFieldType(enum.Enum):
    int = "int"
    float = "float"
    boolean = "boolean"
    date = "date"
    datetime = "datetime"
    string = "string"


class TableField(db.Model):
    __tablename__ = "tables_fields"

    id = db.Column(db.Integer, primary_key=True, index=True)
    name = db.Column(db.String)
    is_primary_key = db.Column(db.Boolean)
    is_index = db.Column(db.Boolean)
    allow_null = db.Column(db.Boolean)
    allow_empty = db.Column(db.Boolean)
    type = db.Column(
        db.Enum(TableFieldType),
        nullable=False,
        default=TableFieldType.int,
    )
    table_id = db.Column(db.Integer, db.ForeignKey("tables.id"))
