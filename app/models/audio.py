from .db import db

class Audio(db.Model):
    __tablename__ = 'audios'

    id = db.Column(db.Integer, primary_key=True)
    URL = db.Column(db.String, nullable=False)