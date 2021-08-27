from app.legacy.applications.cli import reset_applications
from app.legacy.data_types.cli import reset_data_types
from app.legacy.fields.cli import reset_fields


async def reset_content():
    await reset_data_types()
    await reset_applications()
    await reset_fields()
