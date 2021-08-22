"""Update blogs 2021_08_22_14_24_16

Revision ID: 0970774f0ed8
Revises: a8d1203491bd
Create Date: 2021-08-22 14:24:16.989504

"""
import sqlalchemy as sa

from alembic import op

# revision identifiers, used by Alembic.
revision = "0970774f0ed8"
down_revision = "a8d1203491bd"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "blogs",
        sa.Column("id", sa.Integer(), nullable=True),
        sa.Column("title", sa.String(), nullable=True),
        sa.Column("description", sa.String(), nullable=True),
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("blogs")
    # ### end Alembic commands ###
