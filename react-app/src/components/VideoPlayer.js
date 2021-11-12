import React, { useState, useContext, useEffect } from "react";
import "./styles/gallery.css";
import "./styles/video.css";
import FeatureModal from "./FeatureModal";
import AuthContext from "./context/AuthContext";
import ModalContext from "./context/ModalContext";
import FeaturedVideoContext from "./context/FeaturedVideo";
import AddVideoForm from "./AddVideoForm";
import VideoListenItem from "./VideoListItem";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function VideoPlayer() {
  const { authenticated } = useContext(AuthContext);
  const [videoData, setVideoData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [featuredVideoId, setFeaturedVideoId] = useState(null);

  useEffect(() => {
    if (!videoData) {
      fetch("/api/videos/")
        .then((res) => res.json())
        .then((data) => setVideoData(data));
    }
  }, [videoData]);
  return (
    <ModalContext.Provider value={{ modalOpen, setModalOpen }}>
      <FeaturedVideoContext.Provider
        value={{ featuredVideoId, setFeaturedVideoId }}
      >
        <ImageList
          style={{ margin: "0 auto" }}
          id="video__container"
          variant="quilted"
          cols={window.screen.width > 650 ? 2 : 1}
          // rowHeight={window.screen.width > 650 ? 370 : 400}
        >
          {videoData &&
            videoData.map((video, i) => {
              return <VideoListenItem video={video} />;
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
                  sx={{ fontSize: "7em" }}
                  onClick={() => setModalOpen(true)}
                />
              </ImageListItem>
              {modalOpen && typeof featuredVideoId !== "number" && (
                <FeatureModal>
                  <AddVideoForm />
                </FeatureModal>
              )}
            </>
          )}
        </ImageList>
      </FeaturedVideoContext.Provider>
    </ModalContext.Provider>
  );
}
