import click

from app.core.cli import coro, init_gino
from app.core.utils import reload_model

from .models import Application


async def reset_applications():
    await reload_model(
        model=Application,
        sequence="applications_id_seq",
        fixture_path="app/constructor/applications/fixtures/applications.yaml",
    )


@click.group()
def applications():
    pass


@click.command()
@coro
async def generate_applications():
    await init_gino()
    await reset_applications()
    click.echo("Reload applications")


applications.add_command(generate_applications)
