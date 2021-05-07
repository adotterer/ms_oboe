import React from "react";
import "./styles/container.css";

export default function Container(props) {
  return <div id="div__container">{props.children}</div>;
}
