import React, { useContext, useState } from "react";
import ModalContext from "./context/ModalContext";

export default function DeleteModal() {
  const { modalOpen, setModalOpen } = useContext(ModalContext);
  const [messageText, setMessageText] = useState(
    "Are you sure you want to delete this?"
  );

  if (!modalOpen) return null;
  return (
    <div className="delete__modal__container">
      <div className="delete__modal__message">{messageText}</div>
      <div>
        <button
          onClick={() => {
            new Promise((resolve) => {
              resolve(alert("deleting!"));
            }).then(() => {
              setModalOpen(false);
            });
          }}
        >
          Yes
        </button>
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
