import React, { useState, useContext, useEffect } from "react";
import FeatureModal from "./FeatureModal";
import AuthContext from "./context/AuthContext";
import ModalContext from "./context/ModalContext";

export default function VideoPlayer() {
  const { authenticated } = useContext(AuthContext);
  const [videoData, setVideoData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

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
    </ModalContext.Provider>
  );
}
