import os

import yaml
from sqlalchemy.dialects.postgresql import insert

from app.core.database import db


async def load_from_yaml(model, fixture_path):
    fixture_file_path = os.path.join(os.path.abspath("."), fixture_path)
    with open(fixture_file_path, "r") as yaml_file:
        values = yaml.safe_load(yaml_file)
        print(values)
        await insert(model).values(values).gino.scalar()


async def reset_model(model):
    await model.delete.gino.status()


async def reset_children_keys(model, key):
    values = {key: None}
    await model.update.values(**values).gino.status()


async def reset_sequence(sequence):
    await db.status(f"alter sequence {sequence} restart with 1")


async def reload_model(
    model,
    fixture_path,
    sequence=None,
    children_model=None,
    children_relation_key=None,
    many_to_many_model=None,
):
    if sequence:
        await reset_sequence(sequence)

    if many_to_many_model:
        await reset_model(many_to_many_model)

    if children_model and children_relation_key:
        await reset_children_keys(children_model, children_relation_key)
    await reset_model(model)
    await load_from_yaml(model, fixture_path)
