from app.projects.cli import projects
from app.users.cli import users
import click


cli = click.CommandCollection(sources=[users, projects])


if __name__ == "__main__":
    cli()
