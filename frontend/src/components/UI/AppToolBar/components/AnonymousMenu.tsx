import React from "react";
import { NavLink } from "react-router-dom";

const AnonymousMenu = () => {
  return (
    <>
      <NavLink to="/sign-up" className="nav-link">
        Sign up
      </NavLink>
      <NavLink to="/sign-in" className="nav-link">
        Sign in
      </NavLink>
    </>
  );
};

export default AnonymousMenu;
