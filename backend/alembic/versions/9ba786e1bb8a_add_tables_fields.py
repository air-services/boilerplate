"""Add tables fields

Revision ID: 9ba786e1bb8a
Revises: 7c1c37f9344a
Create Date: 2021-08-27 18:43:25.930667

"""
import sqlalchemy as sa

from alembic import op

# revision identifiers, used by Alembic.
revision = "9ba786e1bb8a"
down_revision = "7c1c37f9344a"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "tables_fields",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(), nullable=True),
        sa.Column("is_primary_key", sa.Boolean(), nullable=True),
        sa.Column("is_index", sa.Boolean(), nullable=True),
        sa.Column("allow_null", sa.Boolean(), nullable=True),
        sa.Column("allow_empty", sa.Boolean(), nullable=True),
        sa.Column(
            "type",
            sa.Enum(
                "int",
                "float",
                "boolean",
                "date",
                "datetime",
                "string",
                name="tablefieldtype",
            ),
            nullable=False,
        ),
        sa.Column("table_id", sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(
            ["table_id"],
            ["tables.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        op.f("ix_tables_fields_id"), "tables_fields", ["id"], unique=False
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f("ix_tables_fields_id"), table_name="tables_fields")
    op.drop_table("tables_fields")
    # ### end Alembic commands ###