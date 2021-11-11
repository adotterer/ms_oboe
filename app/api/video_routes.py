from flask_login import login_required
from flask import Blueprint, jsonify, session, request, redirect, json
from app.api.auth_routes import login
from app.models import Video, db
# from .aws3 import delete_file_on_s3

video_routes = Blueprint('videos', __name__)


@video_routes.route('')
@video_routes.route('/')
def send_videos():
    try:
        videos = Video.query.all()
        # for video in videos:
        #     _, embed_code = video.URL.split("https://www.youtube.com/embed/")
        #     print(embed_code, "embed_code")
        #     video["thumbnail_URL"] = f"https://img.youtube.com/vi/{embed_code}/default.jpg"
        videos_json = jsonify(videos)
        return videos_json
    except Exception as e:
        print("error---->>".ljust(20, "."), e)
        return {"error": e.__dict__}


@video_routes.route("", methods=["POST"])
@video_routes.route("/", methods=["POST"])
@login_required
def add_video():
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


@video_routes.route("/<int:id>/delete")
@login_required
def delete_video(id):
    try:
        video_to_delete = Video.query.get(id)
        db.session.delete(video_to_delete)
        db.session.commit()
        return {"msg": f'deleted resorce at id: {id}'}
    except Exception as e:
        print("error ---->", e)
        return {"error": e.__dict__}
