import os

import click
import yaml
from app.core.cli import coro, init_gino

from .models import User, Role, UsersRoles


@click.group()
def users():
    pass


@click.command()
@coro
async def generate_users():
    await init_gino()
    await User.delete.gino.status()

    with open(
        f"{os.path.abspath('.')}/app/users/fixtures/users.yaml", "r"
    ) as yaml_file:
        users = yaml.safe_load(yaml_file)

    for user in users:
        await User.create(**user)
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
