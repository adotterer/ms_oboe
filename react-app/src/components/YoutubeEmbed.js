import React from "react";
import "./styles/video.css";

export default function YoutubeEmbed({ embedURL }) {
  return (
    <div className="video-responsive">
      <iframe
        src={embedURL}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
}
