import React from "react";
import "./styles/container.css";

// this is the style container for the entire site
export default function Container(props) {
  return <div id="div__container">{props.children}</div>;
}
