import click

from app.core.cli import coro, init_gino
from app.core.utils import reload_model

from .models import Dashboard


async def reset_dashboards():
    await reload_model(
        model=Dashboard,
        sequence="dashboards_id_seq",
        fixture_path="app/dashboards/fixtures/dashboards.yaml",
    )


@click.group()
def dashboards():
    pass


@click.command()
@coro
async def generate_dashboards():
    await init_gino()
    await reset_dashboards()
    click.echo("Reload dashboards")


dashboards.add_command(generate_dashboards)
