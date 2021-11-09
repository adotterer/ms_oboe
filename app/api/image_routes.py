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
        delete_file_on_s3("mshippoboe", s3_key)
        db.session.delete(image_file_to_delete)
        db.session.commit()
        return {"msg": f'deleted resorce at id: {id}'}
    except Exception as e:
        print("error: ", e)
        return {"error": e.__dict__}
