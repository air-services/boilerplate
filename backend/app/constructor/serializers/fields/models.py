import enum

from app.core.database import db


class SerializerFieldType(enum.Enum):
    bool = "bool"
    int = "int"
    float = "float"
    str = "str"
    bytes = "bytes"
    list = "list"
    tuple = "tuple"
    dict = "dict"
    set = "set"
    date = "date"
    datetime = "datetime"


class SerializerField(db.Model):
    __tablename__ = "serializers_fields"

    id = db.Column(db.Integer, primary_key=True, index=True)
    name = db.Column(db.String)
    serializer_id = db.Column(db.Integer, db.ForeignKey("serializers.id"))
    type = db.Column(
        db.Enum(SerializerFieldType),
        nullable=False,
        default=SerializerFieldType.str,
    )
