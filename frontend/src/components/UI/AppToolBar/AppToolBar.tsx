import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../../../app/hook";
import { selectUser } from "../../../store/usersSlice";
import AnonymousMenu from "./components/AnonymousMenu";
import UserMenu from "./components/UserMenu";
import "./AppToolBar.css";

const AppToolBar = () => {
  const user = useAppSelector(selectUser);
  const [navShow, setNavShow] = useState(false);
  const [menuShow, setMenuShow] = useState(false);

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
          <NavLink to="/tours" className="nav-link">
            Tours
          </NavLink>
          <NavLink to="/partners" className="nav-link">
            Our partners
          </NavLink>
          {user ? <UserMenu user={user} /> : <AnonymousMenu />}
        </nav>
        <div className="user-menu">
          {user && <button className="logout">Logout</button>}
          <button
            className={`menu-btn ${menuShow ? "open" : ""}`}
            onClick={() => setMenuShow(!menuShow)}
          >
            <span></span>
            <span></span>
            <span></span>
            <span>menu</span>
          </button>
        </div>
        <div className={`tool-bar-menu ${menuShow ? "menu-active" : ""}`}>
          <button className="close-btn" onClick={() => setMenuShow(!menuShow)}>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppToolBar;
