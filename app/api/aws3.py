import boto3
import botocore
from app.config import Config


S3_KEY = Config.S3_BUCKET
S3_SECRET = Config.S3_SECRET
S3_BUCKET = Config.S3_BUCKET
BUCKET_NAME = "mshippoboe"

bucket_location = boto3.client('s3').get_bucket_location(Bucket=BUCKET_NAME)
# Bucket must be in params

s3 = boto3.client(
    "s3",
    aws_access_key_id=S3_KEY,
    aws_secret_access_key=S3_SECRET
)


def upload_file_to_s3(file, bucket_name, acl="public-read"):

    try:

        s3.upload_fileobj(
            file,
            bucket_name,
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )

    except Exception as e:
        # This is a catch all exception, edit this part to fit your needs.
        print("Something Happened: ", e)
        return e

    return "https://{}.s3.{}.amazonaws.com/{}".format(BUCKET_NAME, bucket_location['LocationConstraint'], file.filename)
