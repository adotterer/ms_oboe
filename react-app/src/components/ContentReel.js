import React from "react";
import MilhaudAudio from "./audio/Milhaud2.wav";

export function AudioPlayer(src) {
  return (
    <div>
      <caption>Milhaud</caption>
      <audio controls src={MilhaudAudio}></audio>
    </div>
  );
}
