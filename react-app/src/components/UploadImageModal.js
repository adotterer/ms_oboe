import React, { useState } from "react";

export default function UploadImageModal() {
  const [selectedFile, setSelectedFile] = useState();

  return (
    <div id="upload__image__modal">
      <div class="upload__image__msg">Upload a new image</div>
      <label htmlFor="title">Title:</label>
      <input name="title" type="text"></input>
      <label htmlFor="description">Description:</label>
      <input type="text"></input>
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
      <button>Upload</button>
    </div>
  );
}
