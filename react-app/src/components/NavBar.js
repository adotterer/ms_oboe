import React from "react";
import { NavLink } from "react-router-dom";
import "./styles/navbar.css";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            Bio
          </NavLink>
        </li>
        <li>
          <NavLink to="/gallery" exact={true} activeClassName="active">
            Gallery
          </NavLink>
        </li>
        <li>
          <NavLink to="/audio" exact={true} activeClassName="active">
            Audio
          </NavLink>
        </li>
        <li>
          <NavLink to="/video" exact={true} activeClassName="active">
            Video
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
