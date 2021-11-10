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

function GalleryMessage({ type, setGalleryMessageType, idToEdit }) {
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  function handleDelete() {
    fetch(`/api/images/${idToEdit}/delete`)
      .then((res) => res.json())
      .then(() => {
        setGalleryMessageType(null);
        window.location.reload();
      });
  }

  function handleEdit() {
    console.log("handle edit");
    fetch(`/api/images/${idToEdit}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newTitle,
        description: newDescription,
      }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res, "res"));
  }

  if (type === "EDIT") {
    return (
      <div>
        <label htmlFor="title">Title: </label>
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          name="title"
          type="text"
        ></input>
        <label htmlFor="description">Description: </label>
        <input
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          name="description"
          type="text"
        ></input>
        <button onClick={handleEdit}>Submit</button>
        <button onClick={() => setGalleryMessageType(null)}>Cancel</button>
      </div>
    );
  } else if (type === "DELETE") {
    return (
      <div>
        Are you sure you want to delete?
        <button onClick={handleDelete}>Yes</button>
        <button onClick={() => setGalleryMessageType(null)}>No</button>
      </div>
    );
  } else return null;
}

export default function Gallery() {
  const [zoomedPhotoId, setZoomedPhotoId] = useState(null);
  const { authenticated } = useContext(AuthContext);
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
            console.log(image, "image object".padStart(20, "*"));
            return (
              <ImageListItem
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (window.screen.width > 650) setZoomedPhotoId(i);
                  else return;
                }}
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
