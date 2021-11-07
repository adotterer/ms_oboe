import React, { useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const imageData = [
  {
    src: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format",
  },
  {
    src: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=164&h=164&fit=crop&auto=format",
  },
  {
    src: "https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=164&h=164&fit=crop&auto=format",
  },
  {
    src: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?w=164&h=164&fit=crop&auto=format",
  },
  {
    src: "https://images.unsplash.com/photo-1533827432537-70133748f5c8?w=164&h=164&fit=crop&auto=format",
  },
  {
    src: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=164&h=164&fit=crop&auto=format",
  },
  {
    src: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6?w=164&h=164&fit=crop&auto=format",
  },
  {
    src: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?w=164&h=164&fit=crop&auto=format",
  },
  {
    src: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?w=164&h=164&fit=crop&auto=format",
  },
];

export default function Gallery() {
  return (
    <div id="gallery__container">
      <ImageList
        style={{ margin: "0 auto" }}
        sx={{ width: "80%", height: 450 }}
        // variant="quilted"
        cols={4}
        rowHeight={"100%"}
      >
        {imageData.map((image, i) => {
          return (
            <ImageListItem key={image.src}>
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
