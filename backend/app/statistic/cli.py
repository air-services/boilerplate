import os

import click
import yaml

from app.core.cli import coro, init_gino
from app.core.database import db

from .models import Card, Icon


@click.group()
def statistic():
    pass


@click.command()
@coro
async def generate_icons():
    await init_gino()
    await Icon.delete.gino.status()
    await db.status("alter sequence icons_id_seq restart with 1")
    with open(
        f"{os.path.abspath('.')}/app/statistic/fixtures/icons.yaml", "r"
    ) as yaml_file:
        icons = yaml.safe_load(yaml_file)

    for icon in icons:
        await Icon.create(**icon)
    click.echo("Generate  icons")


@click.command()
@coro
async def generate_cards():
    await init_gino()
    await Card.delete.gino.status()
    await db.status("alter sequence cards_id_seq restart with 1")

    with open(
        f"{os.path.abspath('.')}/app/statistic/fixtures/cards.yaml", "r"
    ) as yaml_file:
        cards = yaml.safe_load(yaml_file)

    for card in cards:
        await Card.create(**card)
    click.echo("Generate cards")


@click.command()
@coro
async def generate_statistic():
    # reset cards (clear icons relations)
    await init_gino()
    await Card.delete.gino.status()

    await generate_icons()
    await generate_cards()


statistic.add_command(generate_statistic)
statistic.add_command(generate_cards)
statistic.add_command(generate_icons)
