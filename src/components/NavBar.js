import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <div className="navbar">
      <div className="row mt-2">
        <NavLink className="navLink card" to="/discover">
          Discover Movies
        </NavLink>
        <div style={{ width: "30px" }}></div>
        <NavLink className="navLink card" to="/about">
          About
        </NavLink>
        <div style={{ width: "30px" }}></div>
        <NavLink className="navLink card" to="/">
          Home{" "}
        </NavLink>
      </div>
    </div>
  );
}
