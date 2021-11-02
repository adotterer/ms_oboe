from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from .aws3 import upload_file_to_s3
from app.models import Audio, db

upload_routes = Blueprint('upload', __name__)


@upload_routes.route('/',  methods=['POST'])
@login_required
def upload_file():

    try:
        img_url = upload_file_to_s3(request.files["file"], "mshippoboe")
        title = request.form['title']
        composer = request.form['composer']
        performers = request.form['performers']
        new_upload = Audio(
            URL=img_url,
            title=title,
            composer=composer,
            performers=performers,
        )
        db.session.add(new_upload)
        db.session.commit()
        return {
            "response": "successfully received POST request"
        }

    except Exception as e:
        print("error uploading")
        return {
            "response": "Unable to upload"
        }

    print("*".center(40, "*"))
    print("*".center(40, "*"))

    # fileData = request.files["file"]
    # formData = request.form
    # # file = request.files["user_file"]
    # print("form ------>", formData["title"])
    # print("payload ----->", fileData)
