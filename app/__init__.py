import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager

from .models import db, User
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.upload_routes import upload_routes
from .api.audio_routes import audio_routes
from .api.image_routes import image_routes
from .api.video_routes import video_routes
from .api.aws3 import *
from werkzeug.utils import secure_filename

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
app.register_blueprint(upload_routes, url_prefix='/api/upload')
app.register_blueprint(audio_routes, url_prefix='/api/audio')
app.register_blueprint(image_routes, url_prefix='/api/images')
app.register_blueprint(video_routes, url_prefix='/api/videos')
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

@app.route('/xml')
def xml_sitemap(path):
    return app.send_static_file('sitemap.xml')


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    elif path == 'sitemap.xml':
        return app.send_static_file('sitemap.xml')
    return app.send_static_file('index.html')
