import os

import click
import yaml

from app.core.cli import coro, init_gino
from app.core.database import db
from app.dashboards.models import Dashboard

from .associations import ProjectsUsers
from .models import Project


@click.group()
def projects():
    pass


@click.command()
@coro
async def generate_projects():
    await init_gino()
    await db.status("alter sequence projects_id_seq restart with 1")
    await ProjectsUsers.delete.gino.status()
    await Dashboard.update.values(project_id=None).gino.status()
    await Project.delete.gino.status()

    with open(
        f"{os.path.abspath('.')}/app/projects/fixtures/projects.yaml", "r"
    ) as yaml_file:
        projects = yaml.safe_load(yaml_file)

    for project in projects:
        await Project.create(**project)
    click.echo("Reload projects")


@click.command()
@coro
async def generate_projects_users():
    await init_gino()
    await ProjectsUsers.delete.gino.status()

    with open(
        f"{os.path.abspath('.')}/app/projects/fixtures/projects_users.yaml",
        "r",
    ) as yaml_file:
        projects_users = yaml.safe_load(yaml_file)

    for project_user in projects_users:
        await ProjectsUsers.create(**project_user)
    click.echo("Reload projects users")


projects.add_command(generate_projects)
projects.add_command(generate_projects_users)
