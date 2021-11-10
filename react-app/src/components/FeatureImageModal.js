import React from "react";

export default function FeatureImageModal({ image, setFeaturedImageId }) {
  return (
    <div onClick={() => setFeaturedImageId(null)} id="feature__image__modal">
      <img src={image.URL} alt={image.title} />
    </div>
  );
}
