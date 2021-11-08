import React, { useState, useContext } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import AuthContext from "./context/AuthContext";
import "./styles/gallery.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";

// function randomNumber(maxNumber) {
//   return Math.ceil(Math.random() * maxNumber);
// }

const imageData = [
  {
    src: "https://mshippoboe.s3.us-west-1.amazonaws.com/phil_orch_section_1.jpg",
  },
  {
    src: "https://mshippoboe.s3.us-west-1.amazonaws.com/phil_orch_section_2.jpg",
  },
  {
    src: "https://mshippoboe.s3.us-west-1.amazonaws.com/phil_orch_3.jpg",
  },
  {
    src: "https://mshippoboe.s3.us-west-1.amazonaws.com/phil_orch_section_1.jpg",
  },
  {
    src: "https://mshippoboe.s3.us-west-1.amazonaws.com/phil_orch_section_2.jpg",
  },
  {
    src: "https://mshippoboe.s3.us-west-1.amazonaws.com/phil_orch_3.jpg",
  },
  {
    src: "https://mshippoboe.s3.us-west-1.amazonaws.com/phil_orch_section_2.jpg",
  },
  {
    src: "https://mshippoboe.s3.us-west-1.amazonaws.com/phil_orch_3.jpg",
  },
];

export default function Gallery() {
  const [zoomedPhotoId, setZoomedPhotoId] = useState(null);
  const { authenticated } = useContext(AuthContext);

  return (
    <ImageList
      style={{ margin: "0 auto" }}
      id="gallery__container"
      variant="quilted"
      cols={3}
      rowHeight={250}
    >
      {imageData.map((image, i) => {
        return (
          <ImageListItem
            style={{ cursor: "pointer" }}
            onClick={() => setZoomedPhotoId(i)}
            cols={zoomedPhotoId === i ? 2 : 1}
            rows={zoomedPhotoId === i ? 2 : 1}
            key={image.src + i}
          >
            <img
              src={image.src}
              // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={image.title}
              loading="lazy"
            />
          </ImageListItem>
        );
      })}
      {authenticated && (
        <ImageListItem
          id="upload__to_gallery"
          onClick={() => null}
          cols={1}
          rows={1}
          key={"uploader"}
        >
          <AddCircleIcon id="upload__icon__gallery" sx={{ fontSize: "8em" }} />
          {/* <img
              src={"AddCircleIcon"}
              // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={"upload button"}
              loading="lazy"
            /> */}
        </ImageListItem>
      )}
    </ImageList>
  );
}
