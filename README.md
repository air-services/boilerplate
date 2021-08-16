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
    id = db.Column(db.Integer, primary_key=True, index=True)
    name = db.Column(db.String, unique=True, index=True)
    parent_id = db.Column(db.Integer, db.ForeignKey("parents.id"))
```
- Add serializers and relations classes
- Configure and register router in FastAPI appliction
- Run and apply alembic migrations
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


