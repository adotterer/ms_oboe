import React from "react";
import Link from 'next/link'
// import { NavLink } from "react-router-dom";
const BIO = "bio";
const AUDIO = "audio";
const GALLERY = "gallery";
const VIDEO = "video";
const LOGIN = "login";
const LOGOUT = "logout";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">
            Bio
          </Link>
        </li>
        <li>
          <Link href="/gallery">
            Gallery
          </Link>
        </li>
        <li>
            Audio
        </li>
        <li>
            Video
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
