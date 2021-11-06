import boto3
import botocore
from app.config import Config


AWS_ACCESS_KEY_ID = Config.AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY = Config.AWS_SECRET_ACCESS_KEY
S3_BUCKET_NAME = Config.S3_BUCKET_NAME

print("S3_BUCKET_NAME ".ljust(50, "."), S3_BUCKET_NAME)
print("AWS_ACCESS_KEY_ID ".ljust(50, "."), AWS_ACCESS_KEY_ID)
bucket_location = boto3.client('s3').get_bucket_location(Bucket=S3_BUCKET_NAME)
# Bucket must be in params

s3 = boto3.client(
    "s3",
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY
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
        print("Something Happened: ", e)
        return e

    return "https://{}.s3.{}.amazonaws.com/{}".format(S3_BUCKET_NAME, bucket_location['LocationConstraint'], file.filename)


def delete_file_on_s3(bucket_name, s3_key_to_delete):
    try:
        s3.delete_object(Bucket=bucket_name, Key=s3_key_to_delete)
    except Exception as e:
        print("Something Happened: ", e)
        return e
