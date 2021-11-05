from flask_login import login_required
from flask import Blueprint, jsonify, session, request, redirect
from app.models import Audio, db
import json

audio_routes = Blueprint('audio', __name__)


@audio_routes.route('/all')
def send_audio():
    audio_query_results = Audio.query.all()
    audio_files = jsonify(audio_query_results)
    print(audio_files, "audio files")
    return audio_files


@audio_routes.route('/<int:id>/delete')
def delete_audio(id):
    print(id, "id")
    return {"msg": f'deleted resorce at id: {id}'}
