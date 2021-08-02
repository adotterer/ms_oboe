import React from "react";
import "./styles/content_reel.css";
import MilhaudAudio from "./audio/Milhaud2.wav";
import { Upload } from "./Upload";

export function AudioPlayer({ src, musicInfo }) {
  return (
    <>
      <Upload />
      <figure className="audio__grid">
        <figcaption className="audio__title_composer">
          <span className="black__bg">La Création du monde</span>
          <div>
            <span className="black__bg composer">
              Darius Milhaud (1892-1974)
            </span>
          </div>
        </figcaption>
        <div className="audio__player">
          <audio controls src={MilhaudAudio}></audio>
        </div>
        <figcaption className="audio__performers">
          <span className="black__bg">Matthew Shipp, oboe</span>
        </figcaption>
      </figure>
    </>
  );
}

// TODO: fetch all the audios, make a AudioPlayer for each one
