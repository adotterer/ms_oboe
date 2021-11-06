import React, { useEffect } from "react";

export default function DeleteModal() {
  return (
    <div className="delete__modal__container">
      <div className="delete__modal__message">
        Are you sure you want to delete this?
      </div>
      <div>
        <button>Yes</button>
        <button>No</button>
      </div>
    </div>
  );
}
