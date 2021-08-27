import click

from app.core.cli import coro, init_gino
from app.core.utils import reload_model

from .models import Field


async def reset_fields():
    await reload_model(
        model=Field,
        sequence="constructor_fields_id_seq",
        fixture_path="app/constructor/fields/fixtures/fields.yaml",
    )


@click.group()
def fields():
    pass


@click.command()
@coro
async def generate_fields():
    await init_gino()
    await reset_fields()
    click.echo("Reload fields")


fields.add_command(generate_fields)
