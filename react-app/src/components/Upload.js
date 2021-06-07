import React, { useState, useEffect } from "react";

export function Upload() {
  const [title, setTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  // const [formData, setFormData] = useState(new FormData());
  let formData = new FormData();

  useEffect(() => {
    formData.append("file", selectedFile);
    console.log(formData, "formData");
  }, [selectedFile]);

  const submit = async (e) => {
    e.preventDefault();
    console.log("selected file--->", selectedFile);
    formData.append("title", title);
    selectedFile && formData.append("file", selectedFile, "myfile.wav");

    console.log("form data", formData);
    const response = await fetch("/api/upload/", {
      // headers: { "Content-type": "application/json" },
      method: "POST",
      body: formData,
    });
    console.log(await response.json(), "response json");
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
        onChange={({ target: { value } }) => {
          // formData.append("title", value);
          setTitle(value);
        }}
        required
      />
      <input
        name="file_upload"
        type="file"
        accept="wav/mp3/aiff"
        onChange={(e) => {
          setSelectedFile(e.target.files[0]);
        }}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
