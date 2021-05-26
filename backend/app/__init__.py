from fastapi import FastAPI

from app.core.database import SessionLocal

app = FastAPI()


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


from app.users.router import router

app.include_router(router)
