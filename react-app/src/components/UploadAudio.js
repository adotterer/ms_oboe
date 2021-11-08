import React, { useState, useMemo, useContext } from "react";
import AuthContext from "./context/AuthContext";

export function UploadAudio() {
  const { authenticated } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [composer, setComposer] = useState("");
  const [performers, setPerformers] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");
  let formData = new FormData();

  const memoizedPreviewURL = useMemo(() => {
    if (selectedFile) return URL.createObjectURL(selectedFile);
  }, [selectedFile]);

  const submit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      return new Promise((resolve) => {
        setUploadMessage("please choose a file to upload");
        return setTimeout(resolve, 900);
      }).then(() => {
        setUploadMessage("");
      });
    }
    formData.append("title", title);
    formData.append("composer", composer);
    formData.append("performers", performers);
    formData.append("file", selectedFile, "myfile.wav");

    setUploadMessage("uploading...");

    function addDotEffect() {
      setUploadMessage((msg) => (msg += "."));
    }

    const loading_interval_id = setInterval(addDotEffect, 300);

    fetch("/api/upload/audio", {
      // CANNOT HAVE HEADERS FOR UPLOADING FILES!!
      // https://muffinman.io/blog/uploading-files-using-fetch-multipart-form-data/
      method: "POST",
      body: formData,
    })
      .then((res) => {
        formData = new FormData();
        setUploadMessage("Success! 🎼 ");
        clearInterval(loading_interval_id);
        return res.json();
      })
      .then((data) => window.location.reload())
      .catch((e) => {
        console.log("error", e);
      });
  };

  if (!authenticated) {
    return null;
  }
  return (
    <form className="form__upload" onSubmit={submit}>
      {uploadMessage ? (
        <div className="upload__message">{uploadMessage}</div>
      ) : (
        <>
          <div className="form__fields">
            <label htmlFor="title">Title</label>
            <input
              name="title"
              type="text"
              placeholder="title"
              value={title}
              onChange={({ target: { value } }) => {
                setTitle(value);
              }}
              required
            />
            <br />
            <label htmlFor="composer">Composer</label>
            <input
              name="composer"
              placeholder="composer"
              type="text"
              value={composer}
              onChange={({ target: { value } }) => {
                setComposer(value);
              }}
            />
            <br />
            <label htmlFor="Performers">Performer(s)</label>
            <input
              name="performers"
              placeholder="performers"
              type="text"
              value={performers}
              onChange={({ target: { value } }) => {
                setPerformers(value);
              }}
            />

            <input
              name="file_upload"
              type="file"
              accept="wav/mp3/aiff"
              onChange={({
                target: {
                  files: [file],
                },
              }) => {
                setSelectedFile(file);
              }}
            />
            <button type="submit">Submit</button>
          </div>
          <div className="audio_preview">
            {memoizedPreviewURL && (
              <audio controls src={memoizedPreviewURL}></audio>
            )}
          </div>
        </>
      )}
    </form>
  );
}
