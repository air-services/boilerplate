import json

from app.core.crud import CrudView


class RoleView(CrudView):
    def get_list_view(self):
        async def list_view(search: str = ""):
            query = self.model.query
            if search:
                name = json.loads(search).get("name")
                if name:
                    query = query.where(self.model.name.like(f"{name}%"))
            items = await query.gino.all()
            return [item.to_dict() for item in items]

        return list_view
