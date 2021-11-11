from dataclasses import dataclass
from .db import db


@dataclass
class Video(db.Model):
    id: int
    URL: str
    title: str
    description: str
    __tablename__ = 'videos'

    id = db.Column(db.Integer, primary_key=True)
    URL = db.Column(db.String, nullable=False)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
