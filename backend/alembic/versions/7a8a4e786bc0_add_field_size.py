"""Add field size

Revision ID: 7a8a4e786bc0
Revises: afeb3d856cc5
Create Date: 2021-08-17 11:52:46.158023

"""
import sqlalchemy as sa

from alembic import op

# revision identifiers, used by Alembic.
revision = "7a8a4e786bc0"
down_revision = "afeb3d856cc5"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column(
        "constructor_fields", sa.Column("size", sa.Integer(), nullable=True)
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column("constructor_fields", "size")
    # ### end Alembic commands ###
