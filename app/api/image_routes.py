from flask_login import login_required
from flask import Blueprint, jsonify, session, request, redirect
from app.models import db, Image
from .aws3 import delete_file_on_s3
from flask import json

image_routes = Blueprint('images', __name__)


@image_routes.route('/')
def send_gallery():
    try:
        gallery = Image.query.all()
        image_json = jsonify(gallery)
        return image_json
    except Exception as e:
        print("error----->>".ljust(20, "."), e)
        return {"error": e.__dict__}


@image_routes.route('/<int:id>/delete')
@login_required
def delete_image(id):
    try:
        image_file_to_delete = Image.query.get(id)
        _, s3_key = image_file_to_delete.URL.split(
            "https://mshippoboe.s3.us-west-1.amazonaws.com/")
        print(s3_key, "s3_key".ljust(20, "*"))
        delete_file_on_s3("mshippoboe", s3_key)
        db.session.delete(image_file_to_delete)
        db.session.commit()
        return {"msg": f'deleted resorce at id: {id}'}
    except Exception as e:
        print("error: ", e)
        return {"error": e.__dict__}


@image_routes.route('/<int:id>',  methods=['PUT'])
@login_required
def edit_image(id):
    try:
        image_row_to_edit = Image.query.get(id)
        json_data = request.get_json()
        new_title = json_data["title"]
        new_description = json_data["description"]

        image_row_to_edit.title = new_title
        image_row_to_edit.description = new_description

        db.session.commit()
        return jsonify(image_row_to_edit)
    except Exception as e:
        print("error", e)
        return {"error": e.__dict__}
