import React, { useState, useMemo } from "react";

export default function UploadImageModal() {
  const [selectedFile, setSelectedFile] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const formData = new FormData();

  const memoizedPreviewURL = useMemo(() => {
    if (selectedFile) return URL.createObjectURL(selectedFile);
  }, [selectedFile]);

  const handleSubmit = function (e) {
    e.preventDefault();
    formData.append("file", selectedFile);
    formData.append("title", title);
    formData.append("description", description);
  };

  return (
    <form onSubmit={handleSubmit} id="upload__image__modal">
      <div className="upload__image__msg">
        {memoizedPreviewURL ? (
          <img src={memoizedPreviewURL} alt="upload preview" />
        ) : (
          "Upload a new image"
        )}
      </div>
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
      <button>Upload</button>
    </form>
  );
}
