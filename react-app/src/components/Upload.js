import React, { useState, useEffect } from "react";

export function Upload() {
  const [title, setTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  // const [formData, setFormData] = useState(new FormData());
  let formData = new FormData();

  const submit = async (e) => {
    e.preventDefault();
    console.log("selected File", selectedFile);
    formData.append("title", title);
    formData.append("file", selectedFile, "myfile.wav");
    const response = await fetch("/api/upload/", {
      // CANNOT HAVE HEADERS FOR UPLOADING FILES!!
      // https://muffinman.io/blog/uploading-files-using-fetch-multipart-form-data/
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
          setTitle(value);
        }}
        required
      />
      <input
        name="file_upload"
        type="file"
        accept="wav/mp3/aiff"
        onChange={({
          target: {
            files: [file],
          },
        }) => {
          console.log(file, "line46");
          setSelectedFile(file);
        }}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

[1,2,3].reverse()
