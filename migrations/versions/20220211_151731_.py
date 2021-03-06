"""empty message

Revision ID: 107208f8f129
Revises: 27da56405d7d
Create Date: 2022-02-11 15:17:31.839319

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '107208f8f129'
down_revision = '27da56405d7d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('audios',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('URL', sa.String(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('composer', sa.String(), nullable=False),
    sa.Column('performers', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('images',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('URL', sa.String(), nullable=False),
    sa.Column('title', sa.String(), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('rankings',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('table_name', sa.String(), nullable=False),
    sa.Column('ranking_order', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('videos',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('URL', sa.String(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('videos')
    op.drop_table('users')
    op.drop_table('rankings')
    op.drop_table('images')
    op.drop_table('audios')
    # ### end Alembic commands ###
