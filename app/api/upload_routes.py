from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user

upload_routes = Blueprint('upload', __name__)


@upload_routes.route('/',  methods=['POST'])
@login_required
def upload_file():

    print(current_user.get_id())

    if(request.files):
        print(request.files)

    # fileData = request.files["file"]
    # formData = request.form
    # # file = request.files["user_file"]
    # print("form ------>", formData["title"])
    # print("payload ----->", fileData)
    return {
        "response": "successfully received POST request"}
    # print(payload, "payload")
    # print("form", form)
