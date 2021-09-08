"""Add icons

Revision ID: 6c1ca39464c2
Revises: b630f02a9ba8
Create Date: 2021-09-02 16:29:27.161452

"""
import sqlalchemy as sa

from alembic import op

# revision identifiers, used by Alembic.
revision = "6c1ca39464c2"
down_revision = "b630f02a9ba8"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column(
        "applications", sa.Column("icon_id", sa.Integer(), nullable=True)
    )
    op.create_foreign_key(None, "applications", "icons", ["icon_id"], ["id"])
    op.drop_column("applications", "icon")
    op.add_column("modules", sa.Column("icon_id", sa.Integer(), nullable=True))
    op.create_foreign_key(None, "modules", "icons", ["icon_id"], ["id"])
    op.drop_column("modules", "icon")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column(
        "modules",
        sa.Column("icon", sa.VARCHAR(), autoincrement=False, nullable=True),
    )
    op.drop_constraint(None, "modules", type_="foreignkey")
    op.drop_column("modules", "icon_id")
    op.add_column(
        "applications",
        sa.Column("icon", sa.VARCHAR(), autoincrement=False, nullable=True),
    )
    op.drop_constraint(None, "applications", type_="foreignkey")
    op.drop_column("applications", "icon_id")
    # ### end Alembic commands ###