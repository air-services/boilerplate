import click

from app.constructor.applications.cli import applications
from app.constructor.data_types.cli import data_types
from app.constructor.fields.cli import fields
from app.core.cli import (
    apply_migrations,
    coro,
    generate_migrations,
    reset_database,
)
from app.dashboards.cli import dashboards
from app.projects.cli import projects
from app.roles.cli import roles
from app.statistic.cli import statistic
from app.users.cli import users


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
        users,
        projects,
        roles,
        dashboards,
        statistic,
        data_types,
        applications,
        fields,
    ]
)


if __name__ == "__main__":
    cli()
