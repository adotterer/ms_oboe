from dataclasses import dataclass
from .db import db

# Python 3.7+ and Flask 1.1+ can use the built-in dataclasses package
# https://stackoverflow.com/questions/5022066/how-to-serialize-sqlalchemy-result-to-json/57732785#57732785


@dataclass
class Audio(db.Model):
    id: int
    URL: str
    title: str
    composer: str
    performers: str
    __tablename__ = 'audios'

    id = db.Column(db.Integer, primary_key=True)
    URL = db.Column(db.String, nullable=False)
    title = db.Column(db.String, nullable=False)
    composer = db.Column(db.String, nullable=False)
    performers = db.Column(db.String, nullable=True)
