# FastAPI crud admin
CRUD api generate helper for FastAPI applications

## Why
- Fast create prototype ready api
- Easy edit and update models
- Common pattern for all modules and easy to support micro-applications

## How to use
- Create db model with fields
```
class MyModel(db.Model):
    __tablename__ = "models"

    id = db.Column(db.Integer, primary_key=True, index=True)
    name = db.Column(db.String, unique=True, index=True)
    description = db.Column(db.String)
    parent_id = db.Column(db.Integer, db.ForeignKey("parents.id"))


class ParentModel(db.Model):
    __tablename__ = "parents"

    id = db.Column(db.Integer, primary_key=True, index=True)
    name = db.Column(db.String, unique=True, index=True)
```
- Add serializers and relations classes

```
# serializer
from typing import List
from pydantic import BaseModel

class MyModel(BaseModel):
    name: str
    description: str

class MyModelGetItem(MyModel):
    id: int
    name: str
    description: str

class ModelSerializer(CrudSerializer):
    get_list_response_model = MyModelGetList
    get_item_response_model = MyModelGetItem
    update_item_request_model = MyModelCreateUpdate
    update_item_response_model = MyModeGetItem
    create_item_request_model = MyModelCreateUpdate
    create_item_response_model = MyModelGetItem
    remove_item_response_model = MyModelGetItem

# relations
from app.core.crud.crud_relations import (
    CrudModelRelation,
    CrudModelRelationType,
    CrudRelations,
)
from .models import MyModel, ParentModel


class ParentRelation(CrudModelRelation):
    relation_type = CrudModelRelationType.PARENT
    field = "project"
    model = MyModel
    relation_model = ParentModel
    base_key = "my_model_id"
    relation_key = "parent_id"

class MyModelCrudRelations(CrudRelations):
    get_item_relations = [ParentRelation]
    update_item_relations = [ParentRelation]
```

- Configure and register router in FastAPI appliction
```
mymodel_router = CrudRouter(
    serializer=MoModelSerializer,
    view=MoModelView,
    model=MoModel,
    relations=MoModelCrudRelations,
    prefix="/api/v1/models",
    tags=["models"],
    responses={404: {"description": "Not found"}},
).get_router()
```
- Run and apply alembic migrations
```
alembic upgrade head;
alembic revision --autogenerate -m "Add my model"
```
- Start applications

## Docker compose
- Install docker and docker-compose
- Copy backend/alembic.example.ini -> backend/alembic.ini, configure alembic.ini
- Run docker-compose up in folder

## Roadmap
- Backend:
    - Permissions
    - Support for one-to-one relations
    - Configure celery for queue tasks
    - Support other db engines (now only gino)

- Frontend:
    - Form validation
    - Visual editor for create and update db models with
      auto generate code and migrations


