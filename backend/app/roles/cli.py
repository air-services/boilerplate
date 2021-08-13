import os

import bcrypt
import click
import yaml

from app.core.cli import coro, init_gino

from .models import Role


@click.group()
def roles():
    pass


@click.command()
@coro
async def generate_roles():
    await init_gino()
    await Role.delete.gino.status()

    with open(
        f"{os.path.abspath('.')}/app/roles/fixtures/roles.yaml", "r"
    ) as yaml_file:
        roles = yaml.safe_load(yaml_file)

    for role in roles:
        await Role.create(**role)
    click.echo("Reload roles")


roles.add_command(generate_roles)
