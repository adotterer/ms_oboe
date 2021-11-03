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
