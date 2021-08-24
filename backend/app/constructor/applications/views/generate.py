import os

from fastapi.templating import Jinja2Templates
from pydantic import BaseModel


class ApplicationModel(BaseModel):
    id: int


templates = Jinja2Templates(
    directory=os.path.join(
        os.path.abspath("."),
        "app/constructor/applications/views",
    )
)


def to_model_format_name(snake_str):
    components = snake_str.split("_")
    return components[0].title() + "".join(
        symbol.title() for symbol in components[1:]
    )


class ApplicationGenerate:
    async def generate_application(self, application: ApplicationModel):
        application = await self.model.get(application.id)
        relations = await self.get_item_relations(application, self.relations)
        app_path = os.path.join(
            os.path.abspath("."), "app/constructor/build/", application.name
        )
        if not os.path.exists(app_path):
            os.mkdir(app_path)

        template = templates.get_template("model_template.jinja2")

        with open(os.path.join(app_path, "models.py"), "w") as models_file:
            models_file.write(
                template.render(
                    {
                        "name": to_model_format_name(application.name),
                        "fields": relations.get("fields"),
                    },
                )
            )

        return {"message": {"applicationID": application.id}}
