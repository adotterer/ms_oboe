from dataclasses import dataclass
from .db import db


@dataclass
class Ranking(db.Model):
    id: int
    table_name: str
    ranking_order: str
    __tablename__ = 'rankings'

    id = db.Column(db.Integer, primary_key=True)
    table_name = db.Column(db.String, nullable=False)
    ranking_order = db.Column(db.String, nullable=False)
