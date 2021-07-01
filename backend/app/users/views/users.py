from app.core.crud import CrudView
from app.projects.models import Project, ProjectsUsers
from app.users.models import Role, User, UsersRoles
from fastapi import HTTPException


class UsersView(CrudView):
    model = User

    async def update_user_roles(self, user_id, next_roles, prev_roles):
        item = await self.model.get(user_id)
        next_roles_ids = set([role.id for role in next_roles])
        prev_roles_ids = set([role.id for role in prev_roles])

        to_remove = prev_roles_ids - next_roles_ids
        to_add = next_roles_ids - prev_roles_ids
        await UsersRoles.delete.where(
            UsersRoles.user_id == user_id and UsersRoles.role_id.in_(to_remove)
        ).gino.status()

        insert_values = [
            dict(user_id=user_id, role_id=role_id) for role_id in to_add
        ]

        await UsersRoles.insert().gino.all(insert_values)

        return True

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

            users_roles = await UsersRoles.query.where(
                UsersRoles.user_id == item_id
            ).gino.all()
            roles_ids = [item.role_id for item in users_roles]
            roles = await Role.query.where(Role.id.in_(roles_ids)).gino.all()

            await self.update_user_roles(item_id, data.roles, roles)

            return {
                **item.to_dict(),
                "roles": data.roles,
            }

        return update_view

    def get_item_view(self):
        async def item_view(item_id: int):
            item = await self.model.get(item_id)
            users_roles = await UsersRoles.query.where(
                UsersRoles.user_id == item_id
            ).gino.all()
            roles_ids = [item.role_id for item in users_roles]
            roles = await Role.query.where(Role.id.in_(roles_ids)).gino.all()

            if not item:
                raise HTTPException(status_code=404, detail="Not found")
            return {
                **item.to_dict(),
                "roles": [role.to_dict() for role in roles],
            }

        return item_view

    def get_list_view(self):
        async def list_view():
            print("get list view")
            query = (
                User.outerjoin(UsersRoles)
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

            return [
                {
                    **user.to_dict(),
                    "roles": [role.to_dict() for role in user.roles],
                    "projects": [
                        project.to_dict() for project in user.projects
                    ],
                }
                for user in users
            ]

        return list_view
