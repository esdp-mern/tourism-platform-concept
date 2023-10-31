import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../../../app/hook";
import { selectUser } from "../../../store/usersSlice";
import AnonymousMenu from "./AnonymousMenu";
import UserMenu from "./UserMenu";
import "./AppToolBar.css";

const AppToolBar = () => {
  const user = useAppSelector(selectUser);
  const [navShow, setNavShow] = useState(false);

  return (
    <div className="container">
      <div className="tool-bar">
        <div className="logo-wrap">
          <button
            className={`nav-btn ${navShow ? "open" : ""}`}
            onClick={() => setNavShow(!navShow)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <Link to="/" className="logo">
            Tourism Concept
          </Link>
        </div>
        <nav className={`nav ${navShow ? "nav-active" : ""}`}>
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/" className="nav-link">
            Tours
          </NavLink>
          <NavLink to="/" className="nav-link">
            Our partners
          </NavLink>
          {user && (
            <NavLink to="/" className="nav-link">
              My profile
            </NavLink>
          )}
        </nav>
        <div className="user-menu">
          {user ? <UserMenu user={user} /> : <AnonymousMenu />}
        </div>
      </div>
    </div>
  );
};

export default AppToolBar;
