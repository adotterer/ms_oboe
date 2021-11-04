import React, { useState, useEffect, useContext } from "react";
import "./styles/content_reel.css";
import MilhaudAudio from "./audio/Milhaud2.wav";
import { Upload } from "./Upload";
import SelectedAudioContext from "./context/SelectedAudioContext";

export function AudioPlayer({ src, musicInfo }) {
  const [tracklists, setTracklists] = useState();
  const { selectedAudio, setSelectedAudio } = useContext(SelectedAudioContext);

  useEffect(() => {
    if (!tracklists) {
      fetch("/api/audio/all")
        .then((res) => res.json())
        .then((fetchedTracklists) => setTracklists(fetchedTracklists));
    }
  }, [tracklists]);
  return (
    <>
      <Upload />
      <div className="list__and__player">
        <ul className="track__list">
          {tracklists &&
            tracklists.map((tracklist) => {
              return (
                <li
                  key={tracklist.id}
                  onClick={() => setSelectedAudio(tracklist)}
                >
                  <i>{tracklist.title}</i> - {tracklist.composer}
                  <figcaption>{tracklist.performers}</figcaption>
                </li>
              );
            })}
        </ul>

        {selectedAudio && (
          <figure className="audio__grid">
            <figcaption className="audio__title_composer">
              <span className="black__bg">{selectedAudio.title}</span>
              <div>
                <span className="black__bg composer">
                  {selectedAudio.composer}
                </span>
              </div>
            </figcaption>
            <div className="audio__player">
              <audio controls src={selectedAudio.URL}></audio>
            </div>
            <figcaption className="audio__performers">
              <span className="black__bg">{selectedAudio.performers}</span>
            </figcaption>
          </figure>
        )}
      </div>
    </>
  );
}

// TODO: fetch all the audios, make a AudioPlayer for each one
