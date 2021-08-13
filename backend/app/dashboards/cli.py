import os

import click
import yaml

from app.core.cli import coro, init_gino
from app.core.database import db

from .models import Dashboard


@click.group()
def dashboards():
    pass


@click.command()
@coro
async def generate_dashboards():
    await init_gino()
    await db.status("alter sequence dashboards_id_seq restart with 1")
    await Dashboard.delete.gino.status()
    with open(
        f"{os.path.abspath('.')}/app/dashboards/fixtures/dashboards.yaml", "r"
    ) as yaml_file:
        dashboards = yaml.safe_load(yaml_file)

    for dashboard in dashboards:
        await Dashboard.create(**dashboard)
    click.echo("Reload dashboards")


dashboards.add_command(generate_dashboards)
