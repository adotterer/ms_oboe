from flask import Blueprint, json, jsonify, request
from flask_login import login_required, current_user
from .aws3 import upload_file_to_s3
from app.models import Audio, Image, db
from .utils import prettifyComposer

upload_routes = Blueprint('upload', __name__)

# TODO: put these in Audio & Image API routes


@upload_routes.route('/audio',  methods=['POST'])
@login_required
def upload_file():

    try:
        new_file = request.files["file"]
        title = request.form['title']
        composer = request.form['composer']
        performers = request.form['performers']
        new_upload = Audio(
            URL="",
            title=title,
            composer=composer,
            performers=performers,
        )
        db.session.add(new_upload)
        db.session.commit()

        new_id = new_upload.id
        _filename, extension = new_file.filename.split(".")
        pretty_composer = prettifyComposer(composer)
        new_file.filename = f"audio_{new_id}_{pretty_composer}.{extension}"
        # example ---------> "audio_21_brahms.wav"
        audio_url = upload_file_to_s3(request.files["file"], "mshippoboe")
        new_upload.URL = audio_url
        db.session.commit()

        return {
            "new_audio": {
                "id": new_upload.id,
                "title": title,
                "url": new_upload.URL,
                "composer": composer,
                "performers": performers
            }
        }

    except Exception as e:
        print("error uploading", e)
        return {
            "error": "Unable to upload"
        }


@upload_routes.route('/image',  methods=['POST'])
@login_required
def upload_file():
    try:
        new_file = request.files["file"]
        title = request.form['title']
        description = request.form['description']
        print(new_file, "new_file".rjust(15, '*'))
        filename, extension = new_file.filename.split(".")
        new_image = Image(
            URL="",
            title="",
            description=""
        )

        db.session.add(new_image)
        db.session.commit()
        new_id = new_image.id
        new_file.filename = f"image_{new_id}_{filename}.{extension}"
        img_url = upload_file_to_s3(request.files["file"], "mshippoboe")

        new_image.URL = img_url
        db.session.commit()

        return jsonify(new_image)

    except Exception as e:

        print("error uploading", e)
        return {
            "error": "Unable to upload"
        }
