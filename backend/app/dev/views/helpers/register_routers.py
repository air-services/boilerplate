from pydantic import BaseModel

# from app import app
from app.constructor.applications.models import Application
from app.core.crud import CrudRouter, CrudView
from app.core.crud.crud_serializer import CrudSerializer

from .configure_application_serializer import ConfigureApplicationSerializer
from .configure_applicatoin_model import ConfigureApplicationModel


async def register_application(application: Application, fast_api_application):
    model = await ConfigureApplicationModel(application).configure()
    serializer = await ConfigureApplicationSerializer(application).configure()

    router = CrudRouter(
        model=model,
        serializer=serializer,
        view=CrudView,
        prefix=f"/api/v1/{application.table_name}",
        tags=[application.table_name],
        responses={404: {"description": "Not found"}},
    ).get_router()
    fast_api_application.include_router(router)


async def register_routers(fast_api_app):
    for application in await Application.query.gino.all():
        await register_application(application, fast_api_app)

    return {"message": "success"}
