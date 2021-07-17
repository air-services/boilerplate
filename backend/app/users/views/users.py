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
    async def _get_many_to_many_relations(
        item_id, relation_model, through_model, relation_key, through_key
    ):
        through_items = await through_model.query.where(
            getattr(through_model, through_key) == item_id
        ).gino.all()
        ids = [getattr(item, relation_key) for item in through_items]
        items = await relation_model.query.where(
            relation_model.id.in_(ids)
        ).gino.all()
        return [item.to_dict() for item in items]

    @staticmethod
    async def _get_user_projects(item_id: int):
        alias_items = await ProjectsUsers.query.where(
            ProjectsUsers.user_id == item_id
        ).gino.all()

        ids = [item.project_id for item in alias_items]
        items = await Project.query.where(Project.id.in_(ids)).gino.all()
        return [item.to_dict() for item in items]

    async def _get_item_relations(self, item_id: int):
        roles = await self._get_many_to_many_relations(
            item_id=item_id,
            relation_model=Role,
            through_model=UsersRoles,
            relation_key="role_id",
            through_key="user_id",
        )

        projects = await self._get_many_to_many_relations(
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

            LimitedUserModel = User.alias("limited_users")

            query_order = self._get_query_order(sorting)

            limited_users = (
                User.query.order_by(query_order)
                .limit(limit)
                .offset((page - 1) * limit)
                .alias("limited_users")
            )

            query = (
                User.outerjoin(UsersRoles)
                .join(limited_users, User.id == LimitedUserModel.id)
                .outerjoin(Role)
                .outerjoin(ProjectsUsers)
                .outerjoin(Project)
                .select()
            )

            users = await query.gino.load(
                User.distinct(User.id)
                .load(add_role=Role.distinct(Role.id))
                .load(add_project=Project.distinct(Project.id))
            ).all()

            count_query = db.select([db.func.count(self.model.id)])
            items_count = await count_query.gino.scalar()

            return {
                "count": items_count,
                "items": [
                    {
                        **user.to_dict(),
                        "roles": [role.to_dict() for role in user.roles],
                        "projects": [
                            project.to_dict() for project in user.projects
                        ],
                    }
                    for user in users
                ],
            }

        return list_view

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
