import click

from app.core.cli import coro, init_gino
from app.dev.views.helpers.reset_content import reset_content as reset


@click.group()
def dev():
    pass


@click.command()
@coro
async def reset_content():
    await init_gino()
    await reset()
    click.echo("Reset content")


dev.add_command(reset_content)
