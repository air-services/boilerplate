from pydantic import BaseModel

from app.core.cli import apply_migrations

from .migrate import migrate
from .reset_content import reset_content


class CommandModel(BaseModel):
    command: str


async def run_command(info: CommandModel):
    if info.command == "reset-content":
        await reset_content()

    if info.command == "migrate":
        apply_migrations()
    return {"message": "success"}


async def ping():
    return {"message": "pong"}
