from enum import Enum
from typing import Optional


class CrudModelRelationType(Enum):
    MANY_TO_MANY = "many_to_many"
    PARENT = "parent"
    CHILDREN = "children"


class CrudModelRelation:
    field: str
    relation_type: CrudModelRelationType
    model: object
    relation_model: object
    through_model: Optional[object]
    relation_key: str
    base_key: str
    through_key: Optional[str]


class CrudRelations:
    get_item_relations: [CrudModelRelation] = []
    get_list_relations: [CrudModelRelation] = []
    update_item_relations: [CrudModelRelation] = []
