from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from .aws3 import upload_file_to_s3
upload_routes = Blueprint('upload', __name__)


@upload_routes.route('/',  methods=['POST'])
@login_required
def upload_file():

    # print("current user id ".ljust(30, ".") + " " + current_user.get_id())
    # print("uploaded file".ljust(30, ".") +
    #       " " + str(request.files["file"]))
    print(request.files["file"].filename, "filename?")
    img = upload_file_to_s3(request.files["file"], "mshippoboe")
    print(img, "is this a url?")
    print("request form", request.form['title'])
    print("*".center(40, "*"))
    print("*".center(40, "*"))

    # fileData = request.files["file"]
    # formData = request.form
    # # file = request.files["user_file"]
    # print("form ------>", formData["title"])
    # print("payload ----->", fileData)
    return {
        "response": "successfully received POST request"
    }
    # print(payload, "payload")
    # print("form", form)
