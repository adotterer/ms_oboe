import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager

from .models import db, User
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from app.api.aws3 import *
from werkzeug.utils import secure_filename
# from werkzeug.datastructures import FileStorage

from .seeds import seed_commands

from .config import Config

ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png',
                      'jpg', 'jpeg', 'gif', 'wav', 'mp3', 'mp4'}


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


app = Flask(__name__)

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)

# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........


@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
                        generate_csrf(),
                        secure=True if os.environ.get(
                            'FLASK_ENV') == 'production' else False,
                        samesite='Strict' if os.environ.get(
                            'FLASK_ENV') == 'production' else None,
                        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')


@app.route('/upload', methods=["POST"])
def upload_file():
    if "user_file" not in request.files:
        return "no user_file key in request.files"

    file = request.files["user_file"]

    """
        These attributes are also available

        file.filename               # The actual name of the file
        file.content_type
        file.content_length
        file.mimetype

    """

    if file.filename == "":
        return "Please select a file"

    if file and allowed_file(file.filename):
        file.filename = secure_filename(file.filename)
        output = upload_file_to_s3(file, app.config["S3_BUCKET"])
        return str(output)

    else:
        return redirect("/")
