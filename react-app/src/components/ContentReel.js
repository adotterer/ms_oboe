import React from "react";
import MilhaudAudio from "./audio/Milhaud2.wav";

export function AudioPlayer(src) {
  return (
    <figure>
      <audio controls src={MilhaudAudio}></audio>
      <figcaption>Milhaud</figcaption>
    </figure>
  );
}
