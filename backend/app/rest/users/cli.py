import os

import bcrypt
import click
import yaml

from app.core.cli import coro, init_gino
from app.core.database import db
from app.rest.account.router import salt
from app.rest.projects.associations import ProjectsUsers

from .associations import UsersRoles
from .models import User


async def reset_users():
    await ProjectsUsers.delete.gino.status()
    await UsersRoles.delete.gino.status()
    await User.delete.gino.status()
    await db.status("alter sequence users_id_seq restart with 1")

    with open(
        f"{os.path.abspath('')}/app/users/fixtures/users.yaml", "r"
    ) as yaml_file:
        users = yaml.safe_load(yaml_file)

    for user in users:
        user_object = await User.create(
            email=user.get("email"),
            first_name=user.get("first_name"),
            last_name=user.get("last_name"),
            patronymic=user.get("patronymic"),
        )
        if user.get("password"):
            hashed_password = bcrypt.hashpw(
                user.get("password").encode("utf-8"), salt
            ).decode("utf-8")
            await user_object.update(hashed_password=hashed_password).apply()


async def reset_users_roles():
    await UsersRoles.delete.gino.status()
    with open(
        f"{os.path.abspath('')}/app/users/fixtures/users_roles.yaml", "r"
    ) as yaml_file:
        users_roles = yaml.safe_load(yaml_file)

    for user_role in users_roles:
        await UsersRoles.create(**user_role)


@click.group()
def users():
    pass


@click.command()
@coro
async def generate_users():
    await init_gino()
    await reset_users()
    click.echo("Reload users")


@click.command()
@coro
async def generate_users_roles():
    await init_gino()
    await reset_users_roles()
    click.echo("Reload users roles")


users.add_command(generate_users)

users.add_command(generate_users_roles)
