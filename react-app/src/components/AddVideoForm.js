import React, { useState, useContext } from "react";
import ModalContext from "./context/ModalContext";

import "./styles/video.css";

export default function AddVideoForm() {
  const { setModalOpen } = useContext(ModalContext);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const formData = new FormData();
  function handleSubmit(e) {
    e.preventDefault();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("URL", url);
    fetch("/api/videos/", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        setModalOpen(false);
        setTimeout(() => window.location.reload(), 1500);
      });
  }
  return (
    <form onSubmit={handleSubmit} id="add__video__form">
      <div>Add New Video:</div>

      <label htmlFor="url">YouTube Embed URL:</label>
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        name="url"
        type="text"
      ></input>
      <label htmlFor="title">Title:</label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        name="title"
        type="text"
      ></input>
      <label htmlFor="description">Description:</label>
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        name="description"
        type="text"
      ></input>
      <span>
        <button>Submit</button>
        <button onClick={() => setModalOpen(false)}>Close Window</button>
      </span>
    </form>
  );
}
