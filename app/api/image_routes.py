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
