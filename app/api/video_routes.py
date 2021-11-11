from flask_login import login_required
from flask import Blueprint, jsonify, session, request, redirect, json
from app.models import Video, db
# from .aws3 import delete_file_on_s3

video_routes = Blueprint('video', __name__)


@video_routes.route('')
@video_routes.route('/')
def send_videos():
    try:
        videos = Video.query.all()
        videos_json = jsonify(videos)
        return videos_json
    except Exception as e:
        print("error---->>".ljust(20, "."), e)
        return {"error": e.__dict__}
