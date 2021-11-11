import React, { useState, useContext, useEffect } from "react";
import "./styles/gallery.css";
import "./styles/video.css";
import FeatureModal from "./FeatureModal";
import AuthContext from "./context/AuthContext";
import ModalContext from "./context/ModalContext";
import AddVideoForm from "./AddVideoForm";
import YoutubeEmbed from "./YoutubeEmbed";
import VideoMessage from "./VideoMessage";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { getThumbnailURL } from "./utils";

export default function VideoPlayer() {
  const { authenticated } = useContext(AuthContext);
  const [videoData, setVideoData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [videoMessageId, setVideoMessageId] = useState(null);
  const [videoMessageType, setVideoMessageType] = useState(null);
  const [featuredVideoId, setFeaturedVideoId] = useState(null);
  useEffect(() => {
    console.log(featuredVideoId, "featuredVideoId");
    console.log(typeof featuredVideoId, "boolean");
  }, [featuredVideoId]);
  useEffect(() => {
    if (!videoData) {
      fetch("/api/videos/")
        .then((res) => res.json())
        .then((data) => setVideoData(data));
    }
  }, [videoData]);
  return (
    <ModalContext.Provider value={{ modalOpen, setModalOpen }}>
      <ImageList
        style={{ margin: "0 auto" }}
        id="video__container"
        variant="quilted"
        cols={window.screen.width > 650 ? 2 : 1}
        rowHeight={window.screen.width > 650 ? 280 : 240}
      >
        {videoData &&
          videoData.map((video, i) => {
            return (
              <ImageListItem
                className="video__list"
                style={{ cursor: "pointer" }}
                cols={1}
                rows={1}
                key={video.URL + "_" + i}
              >
                <span className="video__list__item">
                  <span className="img__video__msg__container">
                    <img
                      src={getThumbnailURL(video.URL)}
                      onClick={() => {
                        setModalOpen(true);
                        setFeaturedVideoId(i);
                      }}
                      // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      alt={video.title}
                      loading="lazy"
                    />

                    <PlayCircleOutlineIcon
                      className="play__icon"
                      onClick={() => {
                        setModalOpen(true);
                        setFeaturedVideoId(i);
                      }}
                      sx={{ fontSize: "4em" }}
                    />
                    {modalOpen && featuredVideoId === i && (
                      <FeatureModal>
                        <YoutubeEmbed embedURL={video.URL} />
                        <CancelIcon
                          onClick={() => {
                            setVideoMessageId(null);
                            setModalOpen(false);
                            setFeaturedVideoId(null);
                          }}
                          sx={{ fontSize: "6em" }}
                          className="video__close__modal__icon"
                        />
                      </FeatureModal>
                    )}
                    {authenticated && (
                      <div className="video__controls">
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
                    {authenticated && videoMessageId === i && videoMessageType && (
                      <div className="video__msg">
                        <VideoMessage
                          type={videoMessageType}
                          setVideoMessageType={setVideoMessageType}
                          idToEdit={video.id}
                        />
                      </div>
                    )}
                  </span>
                  <figcaption className="video__caption">
                    {video.title}
                  </figcaption>
                </span>
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
    </ModalContext.Provider>
  );
}
