import React, { useState } from "react";

export default function UploadImageModal() {
  return (
    <div id="upload__image__modal">
      <div class="upload__image__msg">Upload a new image</div>
      <label htmlFor="title">Title:</label>
      <input type="text"></input>
      <button>Upload</button>
    </div>
  );
}
