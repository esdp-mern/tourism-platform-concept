import React, { useState } from 'react';
import NavLink from 'next/link';
import AnonymousMenu from './components/AnonymousMenu';
import UserMenu from './components/UserMenu';
import ButtonLoader from '@/components/Loaders/ButtonLoader';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectLogoutLoading, selectUser } from '@/containers/users/usersSlice';
import { logout } from '@/containers/users/usersThunk';
import ToolBarMenu from '@/components/UI/AppToolBar/components/ToolBarMenu';

const AppToolBar = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [navShow, setNavShow] = useState(false);
  const [menuShow, setMenuShow] = useState(false);
  const logoutLoading = useAppSelector(selectLogoutLoading);

  const showMenu = () => setMenuShow(!menuShow);

  const userLogout = async () => {
    await dispatch(logout());
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
          <NavLink href="/" className="logo">
            Tourism Concept
          </NavLink>
        </div>
        <nav className={`nav ${navShow ? 'nav-active' : ''}`}>
          <NavLink href="/" className="nav-link">
            Home
          </NavLink>
          <NavLink href="/tours/all" className="nav-link">
            Tours
          </NavLink>
          <NavLink href="/about" className="nav-link">
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
