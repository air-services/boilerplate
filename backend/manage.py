import click

from app.dashboards.cli import dashboards
from app.projects.cli import projects
from app.roles.cli import roles
from app.statistic.cli import statistic
from app.users.cli import users

cli = click.CommandCollection(
    sources=[users, projects, roles, dashboards, statistic]
)


if __name__ == "__main__":
    cli()
