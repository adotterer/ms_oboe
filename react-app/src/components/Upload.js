import React, { useState } from "react";

export function Upload() {
  const [title, setTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("selectedFile", selectedFile);
    console.log(title, "title");
    console.log(selectedFile, "selectedFile");
    console.log(formData);
    // const response = await window.fetch("/api/upload/", {
    //   headers: { "Content-type": "application/json" },
    //   method: "POST",
    //   body: formData,
    // });
    // console.log(await response.json(), "response json");
  };

  return (
    <form className="form__upload" onSubmit={submit}>
      {selectedFile && (
        <audio controls src={URL.createObjectURL(selectedFile)}></audio>
      )}
      <input
        type="text"
        placeholder=""
        value={title}
        onChange={({ target: { value } }) => setTitle(value)}
        required
      />
      <input
        name="file_upload"
        type="file"
        accept="wav/mp3/aiff"
        onChange={(e) => {
          console.log("35", e.target.files[0]);
          setSelectedFile(e.target.files[0]);
        }}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
