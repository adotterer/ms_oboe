from flask import Blueprint, jsonify, session, request, redirect

audio_routes = Blueprint('audio', __name__)


@audio_routes.route('/all')
def send_audio():
    print("made it to the /audio/all route")
    return {"audio": [{"msg": "audio files will go here"}]}
