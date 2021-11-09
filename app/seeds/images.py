from app.models import db, Image

imageData = [
    {
        "URL": "https://mshippoboe.s3.us-west-1.amazonaws.com/phil_orch_section_1.jpg",
    },
    {
        "URL": "https://mshippoboe.s3.us-west-1.amazonaws.com/phil_orch_section_2.jpg",
    },
    {
        "URL": "https://mshippoboe.s3.us-west-1.amazonaws.com/phil_orch_3.jpg",
    }]


def seed_images():

    db.session.add(demo)

    db.session.commit()


def undo_images():
    db.session.execute('TRUNCATE images;')
    db.session.commit()
