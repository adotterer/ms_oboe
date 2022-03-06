import React from "react";
import "./styles/video.css";
import {getEmbedCode} from "./utils"

export default function YoutubeEmbed({ embedURL }) {
  console.log("embedURL", embedURL)
  return (
    <div className="video-responsive">
      <iframe
        src={"https://www.youtube.com/embed/" + getEmbedCode(embedURL)}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
}

