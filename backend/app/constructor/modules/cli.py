import click

from app.core.cli import coro, init_gino
from app.core.utils import reload_model

from .models import Module


async def reset_modules():
    await reload_model(
        model=Module,
        sequence="modules_id_seq",
        fixture_path="app/constructor/modules/fixtures/modules.yaml",
    )


@click.group()
def modules():
    pass


@click.command()
@coro
async def generate_modules():
    await init_gino()
    await reset_modules()
    click.echo("Reload modules")


modules.add_command(generate_modules)
