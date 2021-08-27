import datetime

from pydantic import BaseModel

from app.core.cli import generate_migrations
from app.legacy.applications.models import Application

from .configure_applicatoin_model import ConfigureApplicationModel


class ApplicationModel(BaseModel):
    id: int


async def generate_migrations_handler():
    applications = await Application.query.gino.all()
    applications_classes = []

    for application in applications:
        application_config = ConfigureApplicationModel(application)
        application_class = await application_config.configure()
        applications_classes.append(application_class)

    now_date_time = datetime.datetime.now().strftime("%Y_%m_%d_%H_%M_%S")
    generate_migrations(f"Update {now_date_time}")
