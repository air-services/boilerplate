import click

from app.constructor.applications.cli import applications
from app.constructor.icons.cli import icons
from app.constructor.modules.cli import modules
from app.constructor.serializers.cli import serializers
from app.constructor.tables.cli import tables
from app.constructor.tables.fields.cli import tables_fields
from app.core.cli import (
    apply_migrations,
    coro,
    generate_migrations,
    reset_database,
)


@click.group()
def db():
    pass


@click.command()
@click.option(
    "--message",
    prompt="Insert migration message",
    help="Migration version message",
)
def makemigrations(message):
    generate_migrations(message)


@click.command()
def migrate():
    apply_migrations()


@click.command()
@coro
async def reset():
    await reset_database()


db.add_command(makemigrations)
db.add_command(migrate)
db.add_command(reset)

cli = click.CommandCollection(
    sources=[
        db,
        applications,
        modules,
        serializers,
        tables,
        tables_fields,
        icons,
    ]
)


if __name__ == "__main__":
    cli()
