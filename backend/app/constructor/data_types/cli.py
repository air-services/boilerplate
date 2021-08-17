import click

from app.core.cli import coro, init_gino
from app.core.utils import reload_model

from .models import DataType


@click.group()
def data_types():
    pass


@click.command()
@coro
async def generate_data_types():
    await init_gino()
    await reload_model(
        model=DataType,
        sequence="constructor_data_types_id_seq",
        fixture_path="app/constructor/data_types/fixtures/data_types.yaml",
    )
    click.echo("Reload data types")


data_types.add_command(generate_data_types)
