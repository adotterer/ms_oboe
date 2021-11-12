import React, { useState, useContext } from "react";
import YoutubeEmbed from "./YoutubeEmbed";
import VideoMessage from "./VideoMessage";
import ModalContext from "./context/ModalContext";
import AuthContext from "./context/AuthContext";
import FeatureModal from "./FeatureModal";
import FeaturedVideoContext from "./context/FeaturedVideo";
import ImageListItem from "@mui/material/ImageListItem";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { getThumbnailURL } from "./utils";

export default function VideoListenItem({ video }) {
  const { authenticated } = useContext(AuthContext);
  const { featuredVideoId, setFeaturedVideoId } =
    useContext(FeaturedVideoContext);
  const { modalOpen, setModalOpen } = useContext(ModalContext);
  const [videoMessageType, setVideoMessageType] = useState(null);
  const [videoIdToEdit, setVideoIdToEdit] = useState();

  return (
    <ImageListItem
      className="video__list"
      style={{ cursor: "pointer" }}
      cols={1}
      rows={1}
      key={video.URL + "_" + video.id}
    >
      <span className="video__list__item">
        <span className="img__video__msg__container">
          <img
            src={getThumbnailURL(video.URL)}
            onClick={() => {
              setModalOpen(true);
              setFeaturedVideoId(video.id);
            }}
            // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={video.title}
            loading="lazy"
          />

          <PlayCircleOutlineIcon
            className="play__icon"
            onClick={() => {
              setModalOpen(true);
              setFeaturedVideoId(video.id);
            }}
            sx={{ fontSize: "4em" }}
          />
          {modalOpen && featuredVideoId === video.id && (
            <FeatureModal>
              <YoutubeEmbed embedURL={video.URL} />
              <CancelIcon
                onClick={() => {
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
                  setVideoIdToEdit(video.id);
                  setVideoMessageType("EDIT");
                }}
                className="hover__crimson gallery__edit__icon"
              />
              <CancelIcon
                onClick={() => {
                  setVideoIdToEdit(video.id);
                  setVideoMessageType("DELETE");
                }}
                className="hover__crimson gallery__delete__icon"
              />
            </div>
          )}
          {authenticated && videoIdToEdit === video.id && videoMessageType && (
            <div className="video__msg">
              <VideoMessage
                type={videoMessageType}
                setVideoMessageType={setVideoMessageType}
                idToEdit={videoIdToEdit}
              />
            </div>
          )}
        </span>
        <figcaption className="video__caption">{video.title}</figcaption>
      </span>
    </ImageListItem>
  );
}
