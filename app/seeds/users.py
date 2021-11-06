from werkzeug.security import generate_password_hash
from app.models import db, User
from app.config import Config

ADMIN_EMAIL = Config.ADMIN_EMAIL
ADMIN_PASSWORD = Config.ADMIN_PASSWORD

# Adds a demo user, you can add other users here if you want


def seed_users():

    demo = User(username='oboe_master', email=ADMIN_EMAIL,
                password=ADMIN_PASSWORD)

    db.session.add(demo)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_users():
    db.session.execute('TRUNCATE users;')
    db.session.commit()
