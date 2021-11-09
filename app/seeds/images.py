from app.api.aws3 import delete_file_on_s3
from app.models import db, Image

image_data = [
    {
        "URL": "https://mshippoboe.s3.us-west-1.amazonaws.com/phil_orch_section_1.jpg",
        "title": "Philadelphia Oboe Section",
        "description": ""
    },
    {
        "URL": "https://mshippoboe.s3.us-west-1.amazonaws.com/phil_orch_section_2.jpg",
        "title": "",
        "description": "",
    },
    {
        "URL": "https://mshippoboe.s3.us-west-1.amazonaws.com/phil_orch_3.jpg",
        "title": "Verizon Hall",
        "description": ""
    }]


def seed_images():

    for image in image_data:
        new_image = Image(URL=image["URL"],
                          title=image["title"],
                          description=image["description"])
        db.session.add(new_image)

    db.session.commit()


def undo_images():
    db.session.execute('TRUNCATE images;')
    db.session.commit()
