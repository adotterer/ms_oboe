import React from "react";
import "./styles/content_reel.css";
import MilhaudAudio from "./audio/Milhaud2.wav";

export function AudioPlayer(src) {
  return (
    <figure id="audio__grid">
      <figcaption class="audio__title_composer">
        <span class="black__bg">La Création du monde</span>
        <div>
          <span class="black__bg composer">Milhaud 1892-1974)</span>
        </div>
      </figcaption>
      <div class="audio__player">
        <audio controls src={MilhaudAudio}></audio>
      </div>
      <figcaption class="audio__performers">
        <span class="black__bg">Matthew Shipp, oboe</span>
      </figcaption>
    </figure>
  );
}
