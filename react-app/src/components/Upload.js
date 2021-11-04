import React, { useState, useMemo } from "react";

export function Upload() {
  const [title, setTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [composer, setComposer] = useState("");
  const [performers, setPerformers] = useState("");
  let formData = new FormData();

  const memoizedPreviewURL = useMemo(() => {
    if (selectedFile) return URL.createObjectURL(selectedFile);
  }, [selectedFile]);

  const submit = async (e) => {
    e.preventDefault();
    formData.append("title", title);
    formData.append("composer", composer);
    formData.append("performers", performers);
    formData.append("file", selectedFile, "myfile.wav");
    fetch("/api/upload/", {
      // CANNOT HAVE HEADERS FOR UPLOADING FILES!!
      // https://muffinman.io/blog/uploading-files-using-fetch-multipart-form-data/
      method: "POST",
      body: formData,
    })
      .then((res) => {
        formData = new FormData();
        return res.json();
      })
      .then((data) => console.log(data));
  };

  return (
    <form className="form__upload" onSubmit={submit}>
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
    </form>
  );
}
