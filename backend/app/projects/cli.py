import os

import click
import yaml
from app.core.cli import coro, init_gino

from .models import Project, ProjectsUsers


@click.group()
def projects():
    pass


@click.command()
@coro
async def generate_projects():
    await init_gino()
    await ProjectsUsers.delete.gino.status()
    await Project.delete.gino.status()

    with open(
        f"{os.path.abspath('.')}/app/projects/fixtures/projects.yaml", "r"
    ) as yaml_file:
        projects = yaml.safe_load(yaml_file)

    for project in projects:
        await Project.create(**project)
    click.echo("Reload projects")


projects.add_command(generate_projects)
