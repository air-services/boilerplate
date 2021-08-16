# FastAPI crud admin
CRUD api generate helper for FastAPI applications

## Why
- Fast create prototype ready api
- Easy edit and update models
- Common pattern for all modules and easy to support micro-applications

## How to use
1. Create db model with fields
```
class Article(db.Model):
    __tablename__ = "models"

    id = db.Column(db.Integer, primary_key=True, index=True)
    name = db.Column(db.String, unique=True, index=True)
    content = db.Column(db.String)
    blog_id = db.Column(db.Integer, db.ForeignKey("blogs.id"))


class Blog(db.Model):
    __tablename__ = "blogs"

    id = db.Column(db.Integer, primary_key=True, index=True)
    name = db.Column(db.String, unique=True, index=True)
```
2. Add serializers and relations classes

```
# serializer
from typing import List
from pydantic import BaseModel

class ArticleBaseFields(BaseModel):
    name: str
    description: str

class ArticleGetItem(ArticleBaseFields):
    id: int
    name: str
    description: str

class ModelSerializer(CrudSerializer):
    get_list_response_model = ArticleGetList
    get_item_response_model = ArticleGetItem
    update_item_request_model = ArticleCreateUpdate
    update_item_response_model = MyModeGetItem
    create_item_request_model = ArticleCreateUpdate
    create_item_response_model = ArticleGetItem
    remove_item_response_model = ArticleGetItem

# relations
from app.core.crud.crud_relations import (
    CrudModelRelation,
    CrudModelRelationType,
    CrudRelations,
)
from .models import Article, Blog


class BlogRelation(CrudModelRelation):
    relation_type = CrudModelRelationType.PARENT
    field = "blog"
    model = Artoicle
    relation_model = Blog
    base_key = "article_id"
    relation_key = "blog_id"

class ArticleCrudRelations(CrudRelations):
    get_item_relations = [BlogRelation]
    update_item_relations = [BlogRelation]
```

3. Configure and register router in FastAPI appliction
```

from fastapi import FastAPI
from starlette.config import Config

from app.articles.router import articles_router

config = Config(".env")
app = FastAPI()

articles_router = CrudRouter(
    serializer=ArticleSerializer,
    view=ArticleView,
    model=Article,
    relations=ArticleCrudRelations,
    prefix="/api/v1/articles",
    tags=["articles"],
    responses={404: {"description": "Not found"}},
).get_router()

app.include_router(articles_router)
```
4. Run and apply alembic migrations
```
alembic upgrade head;
alembic revision --autogenerate -m "Add articles"
```
5. Start applications
```
uvicorn app:app --reload
```
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


