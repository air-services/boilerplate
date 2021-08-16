from fastapi import FastAPI, HTTPException
from starlette.config import Config

from app.account.router import account_router
from app.core.database import db
from app.dashboards.router import dashboards_router
from app.dev import generate_content_handler
from app.projects.router import projects_router
from app.roles.router import roles_router
from app.statistic.router import card_router, icon_router
from app.users.router import users_router

config = Config(".env")
app = FastAPI()


app.include_router(users_router)
app.include_router(roles_router)
app.include_router(account_router)

app.include_router(projects_router)
app.include_router(dashboards_router)
app.include_router(card_router)
app.include_router(icon_router)


@app.post("/api/v1/dev/generate-content/")
async def generate_content():
    print("generate")
    await generate_content_handler()

    return {"status": "ok"}
    # try:
    #     return {"status": "success"}
    # except Exception:
    #     raise HTTPException(
    #         status_code=400, detail={"message": "generate error"}
    #     )


@app.get("/create-user")
async def create_user():
    return {"message": "Hello World"}


@app.on_event("startup")
async def startup():
    engine = await db.set_bind(config("DATABASE_URL", cast=str, default=""))
    db.bind = engine
