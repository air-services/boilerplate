import enum

from app.core.database import db


class SerializerType(enum.Enum):
    GET_ITEM_RESPONSE = "GET_ITEM_RESPONSE"
    GET_LIST_RESPONSE = "GET_LIST_RESPONSE"
    UPDATE_ITEM_REQUEST = "UPDATE_ITEM_REQUEST"
    UPDATE_ITEM_RESPONSE = "UPDATE_ITEM_RESPONSE"
    CREATE_ITEM_REQUEST = "CREATE_ITEM_REQUEST"
    CREATE_ITEM_RESPONSE = "CREATE_ITEM_RESPONSE"
    REMOVE_ITEM_REQUEST = "REMOVE_ITEM_REQUEST"
    REMOVE_ITEM_RESPONSE = "REMOVE_ITEM_RESPONSE"


class Serializer(db.Model):
    __tablename__ = "serializers"

    id = db.Column(db.Integer, primary_key=True, index=True)
    name = db.Column(db.String)
    module_id = db.Column(db.Integer, db.ForeignKey("modules.id"))

    type = db.Column(
        db.Enum(SerializerType),
        nullable=False,
        default=SerializerType.GET_ITEM_RESPONSE,
    )
