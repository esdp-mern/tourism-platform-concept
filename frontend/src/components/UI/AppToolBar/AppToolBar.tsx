import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  selectLogoutLoading,
  selectUser,
  addAlert,
} from '../../../store/usersSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hook';
import AnonymousMenu from './components/AnonymousMenu';
import UserMenu from './components/UserMenu';
import ToolBarMenu from './components/ToolBarMenu';
import './AppToolBar.css';
import { logout } from '../../../store/usersThunk';
import ButtonLoader from '../../Loaders/ButtonLoader';

const AppToolBar = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [navShow, setNavShow] = useState(false);
  const [menuShow, setMenuShow] = useState(false);
  const logoutLoading = useAppSelector(selectLogoutLoading);

  const showMenu = () => setMenuShow(!menuShow);

  const userLogout = async () => {
    try {
      await dispatch(logout());
      dispatch(addAlert({ message: 'You have logged out!', type: 'info' }));
    } catch (e) {
      dispatch(addAlert({ message: 'Something is wrong!', type: 'error' }));
    }
  };

  return (
    <div className="container">
      <div className="tool-bar">
        <div className="logo-wrap">
          <button
            className={`nav-btn ${navShow ? 'open' : ''}`}
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
        <nav className={`nav ${navShow ? 'nav-active' : ''}`}>
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/tours/all" className="nav-link">
            Tours
          </NavLink>
          <NavLink to="/about" className="nav-link">
            About Us
          </NavLink>
          {user ? <UserMenu user={user} /> : <AnonymousMenu />}
        </nav>
        <div className="user-menu">
          {user && (
            <button
              className="logout"
              onClick={userLogout}
              disabled={logoutLoading}
            >
              {logoutLoading ? <ButtonLoader size={16} /> : 'Logout'}
            </button>
          )}
          <button
            className={`menu-btn ${menuShow ? 'open' : ''}`}
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
