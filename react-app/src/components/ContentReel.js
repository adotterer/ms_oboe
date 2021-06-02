import React from "react";
import "./styles/content_reel.css";
import MilhaudAudio from "./audio/Milhaud2.wav";

export function AudioPlayer(src) {
  return (
    <figure id="audio__grid">
      <figcaption class="audio__title_composer">Milhaud</figcaption>
      <div class="audio__player">
        <audio controls src={MilhaudAudio}></audio>
      </div>
      <figcaption class="audio__performers">Matthew Shipp, oboe</figcaption>
    </figure>
  );
}
