import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import "./styles/navbar.css";

const NavBar = ({ setAuthenticated }) => {
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
        {/* <li>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </li> */}
        {/* <li>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </li> */}
        {/* <li>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </li> */}
        {/* <li>
          <LogoutButton setAuthenticated={setAuthenticated} />
        </li> */}
      </ul>
    </nav>
  );
};

export default NavBar;
