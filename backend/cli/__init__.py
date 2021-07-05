import asyncio
from functools import wraps

import click
from app.core.database import db
from app.projects.models import Project, ProjectsUsers
from starlette.config import Config
from yaml import dump, load

config = Config(".env")


async def init_gino():
    engine = await db.set_bind(config("DATABASE_URL", cast=str, default=""))
    db.bind = engine


def coro(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        return asyncio.run(f(*args, **kwargs))

    return wrapper


@click.group()
def projects():
    pass


@click.command()
@coro
async def generate():
    await init_gino()
    await ProjectsUsers.delete.gino.status()
    await Project.delete.gino.status()
    click.echo("Reload projects")


projects.add_command(generate)


if __name__ == "__main__":
    projects()
