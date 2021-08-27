from app.core.crud import Crud, CrudView
from app.legacy.applications.models import Application

from .configure_application_serializer import ConfigureApplicationSerializer
from .configure_applicatoin_model import ConfigureApplicationModel


async def register_application(application: Application, fast_api_application):
    model = await ConfigureApplicationModel(application).configure()
    serializer = await ConfigureApplicationSerializer(application).configure()

    crud = Crud(
        model=model,
        serializer=serializer,
        view=CrudView,
        prefix=f"/api/v1/{application.table_name}",
        tags=[application.table_name],
        responses={404: {"description": "Not found"}},
    ).get_router()
    fast_api_application.include_router(crud.router)


async def register_routers(fast_api_app):
    for application in await Application.query.gino.all():
        await register_application(application, fast_api_app)

    return {"message": "success"}
