import click

from app.core.cli import coro, init_gino
from app.core.utils import reload_model

from .models import Role


async def reset_roles():
    await reload_model(
        model=Role,
        sequence="roles_id_seq",
        fixture_path="app/roles/fixtures/roles.yaml",
    )


@click.group()
def roles():
    pass


@click.command()
@coro
async def generate_roles():
    await init_gino()
    await reset_roles()
    click.echo("Reload roles")


roles.add_command(generate_roles)
