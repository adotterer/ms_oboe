import React, { useState, useContext } from "react";
import ModalContext from "./context/ModalContext";
import "./styles/video.css";

export default function AddVideoForm() {
  const { setModalOpen } = useContext(ModalContext);
  function handleSubmit(e) {
    e.preventDefault();
    console.log("submitted");
  }
  return (
    <form onSubmit={handleSubmit} id="add__video__form">
      <div>Add New Video:</div>
     
      <label htmlFor="url">YouTube Embed URL:</label>
      <input name="url" type="text"></input>
      <label htmlFor="title">Title:</label>
      <input name="title" type="text"></input>
      <label htmlFor="description">Description:</label>
      <input name="description" type="text"></input>
      <span>
        <button>Submit</button>
        <button onClick={() => setModalOpen(false)}>Cancel</button>
      </span>
    </form>
  );
}
