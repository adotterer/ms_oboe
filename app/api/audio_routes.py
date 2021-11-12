from flask_login import login_required
from flask import Blueprint, jsonify, session, request, redirect, json
from sqlalchemy import select
from app.models import Audio, Ranking, db
from .aws3 import delete_file_on_s3

audio_routes = Blueprint('audio', __name__)


@audio_routes.route('/all')
def send_audio():
    try:
        ranking = db.session.query(Ranking).filter(
            Ranking.table_name == 'audios').all()
        print("ranking-->".ljust(20, "*"), ranking)
        audio_query_results = Audio.query.all()
        audio_files = jsonify(audio_query_results)
        return audio_files
    except Exception as e:
        print("error----->>".ljust(20, "."), e)
        return {"error": e.__dict__}


@ audio_routes.route('/<int:id>/delete')
@ login_required
def delete_audio(id):
    try:
        audio_file_to_delete = Audio.query.get(id)
        _, s3_key = audio_file_to_delete.URL.split(
            "https://mshippoboe.s3.us-west-1.amazonaws.com/")
        delete_file_on_s3("mshippoboe", s3_key)
        db.session.delete(audio_file_to_delete)
        db.session.commit()
        return {"msg": f'deleted resorce at id: {id}'}
    except Exception as e:
        print("error: ", e)
        return {"error": e.__dict__}
