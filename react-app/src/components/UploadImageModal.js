import React, { useState } from "react";

export default function UploadImageModal() {
  const [selectedFile, setSelectedFile] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const formData = new FormData();

  const handleSubmit = function () {
    formData.append("file", selectedFile);
  };

  return (
    <div id="upload__image__modal">
      <div class="upload__image__msg">Upload a new image</div>
      <label htmlFor="title">Title:</label>
      <input
        value={title}
        onChange={({ target: { value } }) => setTitle(value)}
        name="title"
        type="text"
      ></input>
      <label htmlFor="description">Description:</label>
      <input
        value={description}
        onChange={({ target: { value } }) => setDescription(value)}
        type="text"
      ></input>
      <input
        name="gallery"
        type="file"
        accept="jpeg/png/jpg/gif"
        onChange={({
          target: {
            files: [file],
          },
        }) => {
          setSelectedFile(file);
        }}
      />
      <button onClick={handleSubmit}>Upload</button>
    </div>
  );
}
