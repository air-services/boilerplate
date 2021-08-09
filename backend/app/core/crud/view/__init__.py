from app.core.database import db

from ..crud_relations import CrudRelations
from ..crud_serializer import CrudSerializer
from .create_item_view import CrudCreateItemView
from .delete_item_view import CrudDeleteItemView
from .get_item_view import CrudGetItemView
from .get_list_view import CrudGetListView
from .update_item_view import CrudUpdateItemView


class CrudView(
    CrudUpdateItemView,
    CrudGetListView,
    CrudGetItemView,
    CrudDeleteItemView,
    CrudCreateItemView,
):
    def __init__(
        self,
        model: db.Model,
        serializer: CrudSerializer = None,
        relations: CrudRelations = CrudRelations,
    ):
        self.model = model
        self.relations = relations
        self.serializer = serializer
        self.limit = 10
