from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from .aws3 import upload_file_to_s3
from app.models import Audio, db
from .utils import prettifyComposer

upload_routes = Blueprint('upload', __name__)


@upload_routes.route('/',  methods=['POST'])
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
        extension = new_file.filename.split(".")
        print(extension, "extension")
        pretty_composer = prettifyComposer(composer)
        new_file.filename = f"audio_{new_id}_{pretty_composer}.{extension[1]}"
        # example ---------> "audio_:id_brahms.wav"
        img_url = upload_file_to_s3(request.files["file"], "mshippoboe")
        new_upload.URL = img_url
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
            "response": "Unable to upload"
        }
