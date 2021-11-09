import React, { useState, useContext, useEffect } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import AuthContext from "./context/AuthContext";
import "./styles/gallery.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ModalContext from "./context/ModalContext";
import UploadImageModal from "./UploadImageModal";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";

function GalleryMessage() {}

export default function Gallery() {
  const [zoomedPhotoId, setZoomedPhotoId] = useState(null);
  const { authenticated } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [galleryMessageType, setGalleryMessageType] = useState(null);

  useEffect(() => {
    if (!imageData) {
      fetch("/api/images")
        .then((res) => res.json())
        .then((data) => setImageData(data));
    }
  }, [imageData]);

  return (
    <ModalContext.Provider value={{ modalOpen, setModalOpen }}>
      <ImageList
        style={{ margin: "0 auto" }}
        id="gallery__container"
        variant="quilted"
        cols={3}
        rowHeight={250}
      >
        {imageData &&
          imageData.map((image, i) => {
            return (
              <ImageListItem
                style={{ cursor: "pointer" }}
                onClick={() => setZoomedPhotoId(i)}
                cols={zoomedPhotoId === i ? 2 : 1}
                rows={zoomedPhotoId === i ? 2 : 1}
                key={image.URL + "_" + i}
              >
                <img
                  src={image.URL}
                  // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={image.title}
                  loading="lazy"
                />
                {authenticated && (
                  <>
                    <div className="gallery__msg">
                      {galleryMessageType && galleryMessageType}
                    </div>
                    <div className="gallery__controls">
                      <EditIcon className="hover__crimson gallery__edit__icon" />
                      <CancelIcon className="hover__crimson gallery__delete__icon" />
                    </div>
                  </>
                )}
              </ImageListItem>
            );
          })}
        {authenticated && (
          <>
            <ImageListItem
              id="upload__to_gallery"
              onClick={() => null}
              cols={1}
              rows={1}
              key={"uploader"}
            >
              <AddCircleIcon
                id="upload__icon__gallery"
                sx={{ fontSize: "8em" }}
                onClick={() => setModalOpen(true)}
              />
            </ImageListItem>
            <UploadImageModal />
          </>
        )}
      </ImageList>
    </ModalContext.Provider>
  );
}
