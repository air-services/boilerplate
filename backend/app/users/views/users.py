import json

from app.core.crud import CrudView
from app.core.database import db
from app.projects.models import Project, ProjectsUsers
from app.users.models import Role, User, UsersRoles
from fastapi import HTTPException
from sqlalchemy import asc, desc
from sqlalchemy.sql.sqltypes import Boolean


class UsersView(CrudView):
    model = User

    def get_update_view(self):
        update_model = self.serializer.update_item_request_model

        async def update_view(item_id: int, data: update_model):
            item = await self.model.get(item_id)
            await item.update(
                first_name=data.first_name,
                last_name=data.last_name,
                patronymic=data.patronymic,
                email=data.email,
                is_active=data.is_active,
            ).apply()

            await self._update_many_to_many_relations(
                item_id,
                data=data,
                data_key="roles",
                through_model=UsersRoles,
                relation_key="role_id",
                base_key="user_id",
            )

            await self._update_many_to_many_relations(
                item_id,
                data=data,
                data_key="projects",
                through_model=ProjectsUsers,
                relation_key="project_id",
                base_key="user_id",
            )

            return {
                **item.to_dict(),
                "roles": data.roles,
                "projects": data.projects,
            }

        return update_view

    @staticmethod
    async def _get_user_projects(item_id: int):
        alias_items = await ProjectsUsers.query.where(
            ProjectsUsers.user_id == item_id
        ).gino.all()

        ids = [item.project_id for item in alias_items]
        items = await Project.query.where(Project.id.in_(ids)).gino.all()
        return [item.to_dict() for item in items]

    async def _get_item_relations(self, item_id: int):
        roles = await self._get_many_to_many_item_relations(
            item_id=item_id,
            relation_model=Role,
            through_model=UsersRoles,
            relation_key="role_id",
            through_key="user_id",
        )

        projects = await self._get_many_to_many_item_relations(
            item_id=item_id,
            relation_model=Project,
            through_model=ProjectsUsers,
            relation_key="project_id",
            through_key="user_id",
        )

        return {
            "roles": roles,
            "projects": projects,
        }

    def get_item_view(self):
        async def item_view(item_id: int):
            item = await self.model.get(item_id)

            if not item:
                raise HTTPException(status_code=404, detail="Not found")
            additional_data = await self._get_item_relations(item_id)
            return {**item.to_dict(), **additional_data}

        return item_view

    def get_list_view(self):
        async def list_view(
            search: str = "", pagination: str = "", sorting: str = ""
        ):
            page = 1
            limit = self.limit

            if pagination:
                pagination_data = json.loads(pagination)
                page = pagination_data.get("page", page)
                limit = pagination_data.get("limit", limit)

            query_order = self._get_query_order(sorting)

            users = (
                User.query.order_by(query_order)
                .limit(limit)
                .offset((page - 1) * limit)
            )

            users = await users.gino.all()

            count_query = db.select([db.func.count(self.model.id)])
            items_count = await count_query.gino.scalar()

            await self._load_users_roles_map(users)

            return {
                "count": items_count,
                "items": [
                    {
                        **user.to_dict(),
                        "roles": self.users_roles_map.get(user.id, []),
                        "projects": [],
                    }
                    for user in users
                ],
            }

        return list_view

    async def _load_users_roles_map(self, users):
        self.users_roles_map = {}
        users_ids = [user.id for user in users]

        users_roles = await UsersRoles.query.where(
            UsersRoles.user_id.in_(users_ids)
        ).gino.all()

        roles_ids = [user_role.role_id for user_role in users_roles]
        roles = await Role.query.where(Role.id.in_(roles_ids)).gino.all()

        self.roles_map = {}
        for role in roles:
            self.roles_map[role.id] = role.to_dict()

        self.users_roles_map = {}
        for user_role in users_roles:
            if not self.users_roles_map.get(user_role.user_id):
                self.users_roles_map[user_role.user_id] = []
            self.users_roles_map.get(user_role.user_id).append(
                self.roles_map[user_role.role_id]
            )

    def _get_query_order(self, sorting):
        key = self.model.id
        if sorting:
            field = json.loads(sorting).get("field")
            order = json.loads(sorting).get("order")

            if type(getattr(self.model, field).type) == Boolean:
                print("cool!!")

            if order == "ASC":
                key = asc(getattr(self.model, field))

            if order == "DESC":
                key = desc(getattr(self.model, field))

        return key


class AlternativeUserView(CrudView):
    pass
