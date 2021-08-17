import click

from app.constructor.data_types.cli import data_types
from app.constructor.fields.cli import fields
from app.constructor.templates.cli import templates
from app.core.cli import apply_migrations, generate_migrations
from app.dashboards.cli import dashboards
from app.projects.cli import projects
from app.roles.cli import roles
from app.statistic.cli import statistic
from app.users.cli import users


@click.group()
def alembic():
    pass


@click.command()
@click.option(
    "--message",
    prompt="Insert migration message",
    help="Migration version message",
)
def make_migrations(message):
    generate_migrations(message)


@click.command()
def migrate():
    apply_migrations()


alembic.add_command(make_migrations)
alembic.add_command(migrate)

cli = click.CommandCollection(
    sources=[
        alembic,
        users,
        projects,
        roles,
        dashboards,
        statistic,
        data_types,
        templates,
        fields,
    ]
)


if __name__ == "__main__":
    cli()
