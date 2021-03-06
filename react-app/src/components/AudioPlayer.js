import React, { useState, useEffect, useContext } from "react";
import "./styles/content_reel.css";
import { UploadAudio } from "./UploadAudio";
import SelectedAudioContext from "./context/SelectedAudioContext";
import DeleteModal from "./DeleteModal";
import ModalContext from "./context/ModalContext";
import AuthContext from "./context/AuthContext";

export function AudioPlayer() {
  const { authenticated } = useContext(AuthContext);
  const { selectedAudio, setSelectedAudio } = useContext(SelectedAudioContext);
  const [tracklists, setTracklists] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [trackIdToDelete, setTrackIdToDelete] = useState();

  useEffect(() => {
    if (!tracklists) {
      fetch("/api/audio/all")
        .then((res) => res.json())
        .then((fetchedTracklists) => setTracklists(fetchedTracklists))
        .catch((e) => console.log("error: ", e));
    }
  }, [tracklists]);

  return (
    <ModalContext.Provider value={{ modalOpen, setModalOpen }}>
      <UploadAudio />
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
                  {authenticated && (
                    <span
                      className="delete__icon"
                      onClick={() => {
                        setTrackIdToDelete(tracklist.id);
                        setModalOpen(true);
                      }}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </span>
                  )}
                  {modalOpen && <DeleteModal objId={trackIdToDelete} />}
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
    </ModalContext.Provider>
  );
}
