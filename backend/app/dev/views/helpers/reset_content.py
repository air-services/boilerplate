from app.constructor.applications.cli import reset_applications
from app.constructor.data_types.cli import reset_data_types
from app.constructor.fields.cli import reset_fields


async def reset_content():
    await reset_data_types()
    await reset_applications()
    await reset_fields()
