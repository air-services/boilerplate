import datetime

from app.core.cli import generate_migrations
from app.core.database import db

from ..fields.models import Field


class Template(db.Model):
    __tablename__ = "constructor_templates"

    id = db.Column(db.Integer, primary_key=True, index=True)
    name = db.Column(db.String)
    description = db.Column(db.String)

    async def migrate(self):
        print("start migrate")
        fields = [
            field.to_dict()
            for field in await Field.query.where(
                Field.template_id == self.id
            ).gino.all()
        ]

        type(
            "ModelClass",
            (db.Model,),
            {
                "__tablename__": self.name,
                "__table_args__ ": {"extend_existing": True},
                "id": db.Column(db.String),
            },
        )

        print(datetime.datetime.now().strftime("%Y_%m_%d_%H_%M_%S"))
        generate_migrations(
            f"Update {self.name} model at {datetime.datetime.now().strftime('%Y-%M')}"
        )
