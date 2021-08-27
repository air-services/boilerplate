import click

from app.core.cli import coro, init_gino
from app.core.utils import reload_model

from ..fields.models import Field
from .models import DataType


async def reset_data_types():
    await reload_model(
        model=DataType,
        sequence="constructor_data_types_id_seq",
        children_model=Field,
        children_relation_key="data_type_id",
        fixture_path="app/constructor/data_types/fixtures/data_types.yaml",
    )


@click.group()
def data_types():
    pass


@click.command()
@coro
async def generate_data_types():
    await init_gino()
    await reset_data_types()
    click.echo("Reload data types")


data_types.add_command(generate_data_types)
