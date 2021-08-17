import os

import click
import yaml

from app.core.cli import coro, init_gino
from app.core.database import db
from app.core.utils import reload_model
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
    await reload_model(
        model=Project,
        sequence="projects_id_seq",
        fixture_path="app/projects/fixtures/projects.yaml",
        children_model=Dashboard,
        children_relation_key="project_id",
        many_to_many_model=ProjectsUsers,
    )
    click.echo("Reload projects")


@click.command()
@coro
async def generate_projects_users():
    await init_gino()
    await ProjectsUsers.delete.gino.status()

    await reload_model(
        model=ProjectsUsers,
        fixture_path="app/projects/fixtures/projects_users.yaml",
    )
    click.echo("Reload projects users")


projects.add_command(generate_projects)
projects.add_command(generate_projects_users)
