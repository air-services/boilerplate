from app.constructor.applications.cli import reset_templates
from app.constructor.data_types.cli import reset_data_types
from app.constructor.fields.cli import reset_fields
from app.dashboards.cli import reset_dashboards
from app.projects.cli import reset_projects, reset_projects_users
from app.roles.cli import reset_roles
from app.statistic.cli import reset_cards, reset_icons
from app.users.cli import reset_users, reset_users_roles


async def reset_content():
    await reset_roles()
    await reset_users()
    await reset_users_roles()
    await reset_projects()
    await reset_dashboards()
    await reset_projects_users()
    await reset_icons()
    await reset_cards()
    await reset_data_types()
    await reset_templates()
    await reset_fields()
