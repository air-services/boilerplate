import click

from app.core.cli import coro, init_gino
from app.core.utils import reload_model

from .models import Template


async def reset_templates():
    await reload_model(
        model=Template,
        sequence="constructor_templates_id_seq",
        fixture_path="app/constructor/templates/fixtures/templates.yaml",
    )


@click.group()
def templates():
    pass


@click.command()
@coro
async def generate_templates():
    await init_gino()
    await reset_templates()
    click.echo("Reload templates")


templates.add_command(generate_templates)