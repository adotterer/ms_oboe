import os


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    SQLALCHEMY_ECHO = True
    S3_BUCKET_NAME = os.environ.get("S3_BUCKET_NAME")
    AWS_ACCESS_KEY_ID = os.environ.get("AWS_ACCESS_KEY_ID")
    AWS_SECRET_ACCESS_KEY = os.environ.get("AWS_SECRET_ACCESS_KEY")
    ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD")
    ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL")
    S3_LOCATION = 'http://{}.s3.amazonaws.com/'.format(S3_BUCKET_NAME)
