import os

import click
import yaml

from app.core.cli import coro, init_gino
from app.core.database import db
from app.core.utils import reload_model

from .models import Card, Icon


async def reset_cards():
    await reload_model(
        model=Card,
        sequence="cards_id_seq",
        fixture_path="app/statistic/fixtures/cards.yaml",
    )


async def reset_icons():
    await reload_model(
        model=Icon,
        sequence="icons_id_seq",
        children_model=Card,
        children_relation_key="icon_id",
        fixture_path="app/statistic/fixtures/icons.yaml",
    )


@click.group()
def statistic():
    pass


@click.command()
@coro
async def generate_icons():
    await init_gino()
    await reset_icons()
    click.echo("Generate  icons")


@click.command()
@coro
async def generate_cards():
    await init_gino()
    await reset_cards()
    click.echo("Generate cards")


@click.command()
@coro
async def generate_statistic():
    # reset cards (clear icons relations)
    await init_gino()
    await generate_icons()
    await generate_cards()


statistic.add_command(generate_statistic)
statistic.add_command(generate_cards)
statistic.add_command(generate_icons)
