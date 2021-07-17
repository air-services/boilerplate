import os

import click
import yaml
from app.core.cli import coro, init_gino
from app.core.database import db
from app.projects.models import ProjectsUsers

from .models import Role, User, UsersRoles


@click.group()
def users():
    pass


@click.command()
@coro
async def generate_users():
    await init_gino()
    await ProjectsUsers.delete.gino.status()
    await UsersRoles.delete.gino.status()
    await User.delete.gino.status()
    await db.status("alter sequence users_id_seq restart with 1")

    with open(
        f"{os.path.abspath('.')}/app/users/fixtures/users.yaml", "r"
    ) as yaml_file:
        users = yaml.safe_load(yaml_file)

    for user in users:
        await User.create(
            email=user.get("email"),
            first_name=user.get("first_name"),
            last_name=user.get("last_name"),
            patronymic=user.get("patronymic"),
        )
    click.echo("Reload users")


@click.command()
@coro
async def generate_roles():
    await init_gino()
    await Role.delete.gino.status()

    with open(
        f"{os.path.abspath('.')}/app/users/fixtures/roles.yaml", "r"
    ) as yaml_file:
        roles = yaml.safe_load(yaml_file)

    for role in roles:
        await Role.create(**role)
    click.echo("Reload roles")


users.add_command(generate_users)
users.add_command(generate_roles)
