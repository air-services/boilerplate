from enum import Enum
from typing import Optional

from app.core.database import db


class CrudModelRelationType(Enum):
    MANY_TO_MANY = "many_to_many"
    PARENT = "parent"
    CHILDREN = "children"


class CrudModelRelation:
    field: str
    relation_type: CrudModelRelationType
    model: db.Model
    relation_model: db.Model
    through_model: Optional[db.Model]
    relation_key: str
    base_key: str
    through_key: Optional[str]


class CrudRelations:
    get_item_relations: [CrudModelRelation]
    get_list_relations: [CrudModelRelation]
    update_item_relations: [CrudModelRelation]
