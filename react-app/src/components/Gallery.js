import React, { useState, useMemo } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

function randomNumber(maxNumber) {
  return Math.ceil(Math.random() * maxNumber);
}

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
  return (
    <div id="gallery__container">
      <ImageList
        style={{ margin: "0 auto" }}
        sx={{ width: "80%", height: "fit-content" }}
        variant="quilted"
        cols={4}
        rowHeight={"100%"}
      >
        {imageData.map((image, i) => {
          return (
            <ImageListItem
              cols={randomNumber(3)}
              rows={randomNumber(3)}
              key={image.src}
            >
              <img
                src={image.src}
                // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt="image"
                loading="lazy"
              />
            </ImageListItem>
          );
        })}
      </ImageList>
    </div>
  );
}
