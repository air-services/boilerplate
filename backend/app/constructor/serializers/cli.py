import click

from app.core.cli import coro, init_gino
from app.core.utils import reload_model

from .models import Serializer


async def reset_serializers():
    await reload_model(
        model=Serializer,
        sequence="serializers_id_seq",
        fixture_path="app/constructor/serializers/fixtures/serializers.yaml",
    )


@click.group()
def serializers():
    pass


@click.command()
@coro
async def generate_serializers():
    await init_gino()
    await reset_serializers()
    click.echo("Reload serializers")


serializers.add_command(generate_serializers)
