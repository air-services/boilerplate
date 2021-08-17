from app.dashboards.cli import reset_dashboards
from app.projects.cli import reset_projects, reset_projects_users
from app.roles.cli import reset_roles
from app.users.cli import reset_users, reset_users_roles


async def reset_content():
    await reset_roles()
    await reset_users()
    await reset_users_roles()
    await reset_dashboards()
    await reset_projects()
    await reset_projects_users()
