from flask_login import login_required
from flask import Blueprint, jsonify, session, request, redirect
from app.models import db
from .aws3 import delete_file_on_s3
from flask import json

image_routes = Blueprint('images', __name__)


@image_routes.route('/all')
def send_gallery():
    try:
        # audio_query_results = Audio.query.all()
        # audio_files = jsonify(audio_query_results)
        return {"msg": "hi from Rosie"}
    except Exception as e:
        print("error----->>".ljust(20, "."), e)
        return {"error": e.__dict__}
