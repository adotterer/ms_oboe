import React, { useState, useContext, useEffect } from "react";
import "./styles/gallery.css";
import FeatureModal from "./FeatureModal";
import AuthContext from "./context/AuthContext";
import ModalContext from "./context/ModalContext";
import AddVideoForm from "./AddVideoForm";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";

export default function VideoPlayer() {
  const { authenticated } = useContext(AuthContext);
  const [videoData, setVideoData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [videoMessageId, setVideoMessageId] = useState(null);
  const [videoMessageType, setVideoMessageType] = useState(null);
  const [featuredVideoId, setFeaturedVideoId] = useState(null);

  useEffect(() => {
    if (!videoData) {
      fetch("/api/videos/")
        .then((res) => res.json())
        .then((data) => setVideoData(data));
    }
    console.log(videoData, "<--- video data".padEnd(20, "%"));
  }, [videoData]);
  return (
    <ModalContext.Provider value={{ modalOpen, setModalOpen }}>
      <div>Hello from video</div>
      <ImageList
        style={{ margin: "0 auto" }}
        id="video__container"
        variant="quilted"
        cols={window.screen.width > 650 ? 3 : 2}
        rowHeight={window.screen.width > 650 ? 250 : 200}
      >
        {videoData &&
          videoData.map((video, i) => {
            return (
              <ImageListItem
                style={{ cursor: "pointer" }}
                cols={1}
                rows={1}
                key={video.URL + "_" + i}
              >
                <img
                  src={video.URL}
                  onClick={() => setFeaturedVideoId(i)}
                  // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={video.title}
                  loading="lazy"
                />
                {authenticated && (
                  <div className="gallery__controls">
                    <EditIcon
                      onClick={() => {
                        setVideoMessageId(i);
                        setVideoMessageType("EDIT");
                      }}
                      className="hover__crimson gallery__edit__icon"
                    />
                    <CancelIcon
                      onClick={() => {
                        setVideoMessageId(i);
                        setVideoMessageType("DELETE");
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
            {modalOpen && (
              <FeatureModal>
                <AddVideoForm />
              </FeatureModal>
            )}
            {/* <UploadImageModal /> */}
          </>
        )}
      </ImageList>
    </ModalContext.Provider>
  );
}
