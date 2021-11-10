import React from "react";

export function FeatureImageModal({ image }) {
  return (
    <div id="feature__image__modal">
      <img src={image.URL} alt={image.title} />
    </div>
  );
}
