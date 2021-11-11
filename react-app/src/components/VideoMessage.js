import React, { useState } from "react";

export default function VideoMessage({ type, setVideoMessageType, idToEdit }) {
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  function handleDelete() {
    fetch(`/api/videos/${idToEdit}/delete`)
      .then((res) => res.json())
      .then(() => {
        setVideoMessageType(null);
        window.location.reload();
      })
      .catch((e) => console.log(e));
  }
  function handleEdit() {
    fetch(`/api/videos/${idToEdit}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newTitle,
        description: newDescription,
      }),
    })
      .then((res) => res.json())
      .then(() => window.location.reload())
      .catch((e) => console.log(e));
  }

  if (type === "EDIT") {
    return (
      <div>
        <label htmlFor="title">Title: </label>
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          name="title"
          type="text"
        ></input>
        <label htmlFor="description">Description: </label>
        <input
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          name="description"
          type="text"
        ></input>
        <span>
          <button onClick={handleEdit}>Submit</button>
          <button onClick={() => setVideoMessageType(null)}>Cancel</button>
        </span>
      </div>
    );
  } else if (type === "DELETE") {
    return (
      <div>
        Are you sure you want to delete?
        <span>
          <button onClick={handleDelete}>Yes</button>
          <button onClick={() => setVideoMessageType(null)}>No</button>
        </span>
      </div>
    );
  } else return null;
}
