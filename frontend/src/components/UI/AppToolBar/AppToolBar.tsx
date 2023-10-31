import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { selectUser, setAlertData, unsetUser } from "../../../store/usersSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import AnonymousMenu from "./components/AnonymousMenu";
import UserMenu from "./components/UserMenu";
import ToolBarMenu from "./components/ToolBarMenu";
import "./AppToolBar.css";
import { logout } from "../../../store/usersThunk";

const AppToolBar = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [navShow, setNavShow] = useState(false);
  const [menuShow, setMenuShow] = useState(false);

  const showMenu = () => setMenuShow(!menuShow);

  const userLogout = () => {
    try {
      dispatch(unsetUser());
      dispatch(logout());
      dispatch(setAlertData({ message: "You have logged out!", type: "info" }));
    } catch (e) {
      dispatch(setAlertData({ message: "Something is wrong!", type: "error" }));
    }
  };

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
          {user && (
            <button className="logout" onClick={userLogout}>
              Logout
            </button>
          )}
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
        <ToolBarMenu show={menuShow} onClick={showMenu} />
      </div>
    </div>
  );
};

export default AppToolBar;
