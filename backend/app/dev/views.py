from pydantic import BaseModel

from .reset_content import reset_content


class CommandModel(BaseModel):
    command: str


async def run_command(info: CommandModel):
    if info.command == "reset-content":
        await reset_content()
    return {"message": "success"}


async def ping():
    return {"message": "pong"}
