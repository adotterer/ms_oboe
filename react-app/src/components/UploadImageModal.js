import React, { useState, useMemo, useContext } from "react";
import ModalContext from "./context/ModalContext";
import CancelIcon from "@mui/icons-material/Cancel";

export default function UploadImageModal() {
  const { modalOpen, setModalOpen } = useContext(ModalContext);
  const [selectedFile, setSelectedFile] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  let formData = new FormData();

  const memoizedPreviewURL = useMemo(() => {
    if (selectedFile) return URL.createObjectURL(selectedFile);
  }, [selectedFile]);

  const handleSubmit = function (e) {
    e.preventDefault();
    formData.append("file", selectedFile);
    formData.append("title", title);
    formData.append("description", description);
    fetch("/api/upload/image", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        formData = new FormData();
        return res.json();
      })
      .then((res) => {
        setModalOpen(false);
        setTimeout(() => window.location.reload(), 1500);
      });
  };
  if (!modalOpen) return null;
  return (
    <>
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
        <CancelIcon
          onClick={() => setModalOpen(false)}
          className="cancel__icon"
        />
      </form>
    </>
  );
}
