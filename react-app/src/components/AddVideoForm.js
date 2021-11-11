import React, { useState, useContext } from "react";
import ModalContext from "./context/ModalContext";

export default function AddVideoForm() {
  const { setModalOpen } = useContext(ModalContext);
  function handleSubmit(e) {
    e.preventDefault();
    console.log("submitted");
  }
  return (
    <form onSubmit={handleSubmit} id="add__video__form">
      <label htmlFor="url">YouTube Embed URL:</label>
      <input name="url" type="text"></input>
      <button>Submit</button>
      <button onClick={() => setModalOpen(false)}>Cancel</button>
    </form>
  );
}
