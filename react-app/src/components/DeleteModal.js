import React, { useContext, useState } from "react";
import ModalContext from "./context/ModalContext";

export default function DeleteModal({ objId }) {
  const { modalOpen, setModalOpen } = useContext(ModalContext);
  const [messageText, setMessageText] = useState(
    "Are you sure you want to delete this?"
  );

  function deleteOnServer() {
    console.log(objId, "objectId");
    return fetch(`/api/audio/${objId}/delete`)
      .then((res) => {
        return new Promise((resolve) => {
          setMessageText("deleting 😘");
          setTimeout(resolve, 480);
        }).then(() => {
          setModalOpen(false);
          window.location.reload();
        });
      })
      .catch((e) => {
        console.log("error", e);
      });
  }

  if (!modalOpen) return null;
  return (
    <div className="delete__modal__container">
      <div className="delete__modal__message">{messageText}</div>
      <div>
        <button onClick={deleteOnServer}>Yes</button>
        <button
          onClick={() => {
            new Promise((resolve) => {
              setMessageText("Ok, won't delete 😘");
              setTimeout(resolve, 800);
            }).then(() => {
              setModalOpen(false);
            });
          }}
        >
          No
        </button>
      </div>
    </div>
  );
}
