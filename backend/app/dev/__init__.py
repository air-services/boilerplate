import os

import bcrypt
import yaml

from app.account.router import salt
from app.core.database import db
from app.dashboards.models import Dashboard
from app.projects.associations import ProjectsUsers
from app.projects.models import Project
from app.roles.models import Role
from app.statistic.models import Card, Icon
from app.users.associations import UsersRoles
from app.users.models import User


async def generate_content_handler():
    # generate users
    await ProjectsUsers.delete.gino.status()
    await UsersRoles.delete.gino.status()
    await User.delete.gino.status()
    await db.status("alter sequence users_id_seq restart with 1")

    with open(
        f"{os.path.abspath('.')}/app/users/fixtures/users.yaml", "r"
    ) as yaml_file:
        users = yaml.safe_load(yaml_file)

    for user in users:
        user_object = await User.create(
            email=user.get("email"),
            first_name=user.get("first_name"),
            last_name=user.get("last_name"),
            patronymic=user.get("patronymic"),
        )
        if user.get("password"):
            hashed_password = bcrypt.hashpw(
                user.get("password").encode("utf-8"), salt
            ).decode("utf-8")
            await user_object.update(hashed_password=hashed_password).apply()

    # generate projects
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

    # generate projects users
    await ProjectsUsers.delete.gino.status()

    with open(
        f"{os.path.abspath('.')}/app/projects/fixtures/projects_users.yaml",
        "r",
    ) as yaml_file:
        projects_users = yaml.safe_load(yaml_file)

    for project_user in projects_users:
        await ProjectsUsers.create(**project_user)

    # generate dashboards
    await db.status("alter sequence dashboards_id_seq restart with 1")
    await Dashboard.delete.gino.status()
    with open(
        f"{os.path.abspath('.')}/app/dashboards/fixtures/dashboards.yaml",
        "r",
    ) as yaml_file:
        dashboards = yaml.safe_load(yaml_file)

    for dashboard in dashboards:
        await Dashboard.create(**dashboard)

    # generate roles
    await Role.delete.gino.status()

    with open(
        f"{os.path.abspath('.')}/app/roles/fixtures/roles.yaml", "r"
    ) as yaml_file:
        roles = yaml.safe_load(yaml_file)

    for role in roles:
        await Role.create(**role)

    # generate icons and cards
    await Card.delete.gino.status()
    await db.status("alter sequence cards_id_seq restart with 1")

    await Icon.delete.gino.status()
    await db.status("alter sequence icons_id_seq restart with 1")
    with open(
        f"{os.path.abspath('.')}/app/statistic/fixtures/icons.yaml", "r"
    ) as yaml_file:
        icons = yaml.safe_load(yaml_file)

    for icon in icons:
        await Icon.create(**icon)
    with open(
        f"{os.path.abspath('.')}/app/statistic/fixtures/cards.yaml", "r"
    ) as yaml_file:
        cards = yaml.safe_load(yaml_file)

    for card in cards:
        await Card.create(**card)
