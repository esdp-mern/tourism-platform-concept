import React from "react";
import { NavLink } from "react-router-dom";

const AnonymousMenu = () => {
  return (
    <>
      <NavLink to="/register" className="nav-link">
        Sign up
      </NavLink>
      <NavLink to="/login" className="nav-link">
        Sign in
      </NavLink>
    </>
  );
};

export default AnonymousMenu;
