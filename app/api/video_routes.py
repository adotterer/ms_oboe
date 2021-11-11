from flask_login import login_required
from flask import Blueprint, jsonify, session, request, redirect, json
from app.models import Video, db
# from .aws3 import delete_file_on_s3

video_routes = Blueprint('videos', __name__)


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


@video_routes.route("", methods=["POST"])
@video_routes.route("/", methods=["POST"])
@login_required
def upload_video():
    try:
        url = request.form['URL']
        title = request.form['title']
        description = request.form['description']

        new_video = Video(
            URL=url,
            title=title,
            description=description
        )

        db.session.add(new_video)
        db.session.commit()

        return jsonify(new_video)
    except Exception as e:
        return {"error": e.__dict__}
