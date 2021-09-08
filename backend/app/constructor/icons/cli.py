import click

from app.core.cli import coro, init_gino
from app.core.utils import reload_model

from .models import Icon


async def reset_icons():
    await reload_model(
        model=Icon,
        sequence="icons_id_seq",
        fixture_path="app/constructor/icons/fixtures/icons.yaml",
    )


@click.group()
def icons():
    pass


@click.command()
@coro
async def generate_icons():
    await init_gino()
    await reset_icons()
    click.echo("Reload icons")


icons.add_command(generate_icons)
