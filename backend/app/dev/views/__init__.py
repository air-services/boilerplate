from fastapi import HTTPException
from pydantic import BaseModel

from app.core.cli import apply_migrations

from .helpers.generate_migrations import generate_migrations_handler
from .helpers.register_routers import register_routers
from .helpers.reset_content import reset_content


class CommandModel(BaseModel):
    command: str


from fastapi import Request


async def run_command(info: CommandModel, request: Request):
    try:
        if info.command == "reset-content":
            await reset_content()

        if info.command == "migrate":
            apply_migrations()

        if info.command == "generate-migrations":
            await generate_migrations_handler()

        if info.command == "register-routers":
            await register_routers(request.app)

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    return {"message": "success"}


async def ping():
    return {"message": "pong"}
