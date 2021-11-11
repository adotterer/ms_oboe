import React, { useState, useContext, useEffect } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import AuthContext from "./context/AuthContext";
import "./styles/gallery.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ModalContext from "./context/ModalContext";
import UploadImageModal from "./UploadImageModal";
import FeatureModal from "./FeatureModal";
import GalleryMessage from "./GalleryMessage";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";



export default function Gallery() {
  const { authenticated } = useContext(AuthContext);
  const [featuredImageId, setFeaturedImageId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [galleryMessageType, setGalleryMessageType] = useState(null);
  const [galleryMessageId, setGalleryMessageId] = useState(null);

  useEffect(() => {
    if (!imageData) {
      fetch("/api/images/")
        // ERROR:
        // Mixed Content: The page at 'https://www.matthewshippoboe.com/gallery' was loaded over HTTPS, but requested an insecure resource 'http://www.matthewshippoboe.com/api/images/'. This request has been blocked; the content must be served over HTTPS.
        .then((res) => res.json())
        .then((data) => setImageData(data));
    }
  }, [imageData]);

  useEffect(() => {
    if (!galleryMessageType) setGalleryMessageId(null);
  }, [galleryMessageType]);

  return (
    <ModalContext.Provider value={{ modalOpen, setModalOpen }}>
      <ImageList
        style={{ margin: "0 auto" }}
        id="gallery__container"
        variant="quilted"
        cols={window.screen.width > 650 ? 3 : 2}
        rowHeight={window.screen.width > 650 ? 250 : 200}
      >
        {imageData &&
          imageData.map((image, i) => {
            return (
              <ImageListItem
                style={{ cursor: "pointer" }}
                cols={1}
                rows={1}
                key={image.URL + "_" + i}
              >
                {featuredImageId === i && (
                  <FeatureModal>
                    <img
                      onClick={() => setFeaturedImageId(null)}
                      src={image.URL}
                      alt={image.title}
                    />
                  </FeatureModal>
                )}
                <img
                  src={image.URL}
                  onClick={() => setFeaturedImageId(i)}
                  // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={image.title}
                  loading="lazy"
                />

                {authenticated && galleryMessageType && galleryMessageId === i && (
                  <div className="gallery__msg">
                    <GalleryMessage
                      idToEdit={image.id}
                      type={galleryMessageType}
                      setGalleryMessageType={setGalleryMessageType}
                    />
                  </div>
                )}
                {authenticated && (
                  <div className="gallery__controls">
                    <EditIcon
                      onClick={() => {
                        setGalleryMessageId(i);
                        setGalleryMessageType("EDIT");
                      }}
                      className="hover__crimson gallery__edit__icon"
                    />
                    <CancelIcon
                      onClick={() => {
                        setGalleryMessageId(i);
                        setGalleryMessageType("DELETE");
                      }}
                      className="hover__crimson gallery__delete__icon"
                    />
                  </div>
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
