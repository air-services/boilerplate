import click

from app.core.cli import coro, init_gino
from app.core.utils import reload_model

from .models import TableField


async def reset_tables_fields():
    await reload_model(
        model=TableField,
        sequence="tables_fields_id_seq",
        fixture_path="app/constructor/tables/fields/fixtures/tables_fields.yaml",
    )


@click.group()
def tables_fields():
    pass


@click.command()
@coro
async def generate_tables_fields():
    await init_gino()
    await reset_tables_fields()
    click.echo("Reload tables_fields")


tables_fields.add_command(generate_tables_fields)
