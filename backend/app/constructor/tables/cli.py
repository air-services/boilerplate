import click

from app.core.cli import coro, init_gino
from app.core.utils import reload_model

from .models import Table


async def reset_tables():
    await reload_model(
        model=Table,
        sequence="tables_id_seq",
        fixture_path="app/constructor/tables/fixtures/tables.yaml",
    )


@click.group()
def tables():
    pass


@click.command()
@coro
async def generate_tables():
    await init_gino()
    await reset_tables()
    click.echo("Reload tables")


tables.add_command(generate_tables)
