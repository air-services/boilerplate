import click

from app.core.cli import coro, init_gino
from app.core.utils import reload_model

from ..fields.models import Field
from .models import Application


async def reset_applications():
    await reload_model(
        model=Application,
        sequence="constructor_applications_id_seq",
        fixture_path="app/constructor/applications/fixtures/applications.yaml",
        children_model=Field,
        children_relation_key="application_id",
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
