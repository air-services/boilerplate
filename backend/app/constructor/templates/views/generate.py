import os

from fastapi.templating import Jinja2Templates
from pydantic import BaseModel


class TemplateModel(BaseModel):
    id: int


templates = Jinja2Templates(
    directory=os.path.join(
        os.path.abspath("."),
        "app/constructor/templates/views",
    )
)


def to_model_format_name(snake_str):
    components = snake_str.split("_")
    return components[0].title() + "".join(
        symbol.title() for symbol in components[1:]
    )


from app.core.crud.view.get_item_view import CrudGetItemView


class TemplateGenerate:
    async def generate_template(self, template: TemplateModel):
        template = await self.model.get(template.id)
        relations = await self.get_item_relations(template, self.relations)
        app_path = os.path.join(
            os.path.abspath("."), "app/constructor/build/", template.name
        )
        if not os.path.exists(app_path):
            os.mkdir(app_path)

        j2_template = templates.get_template("model_template.jinja2")

        with open(os.path.join(app_path, "models.py"), "w") as models_file:
            models_file.write(
                j2_template.render(
                    {
                        "name": to_model_format_name(template.name),
                        "fields": relations.get("fields"),
                    },
                )
            )

        return {"message": {"templateID": template.id}}
