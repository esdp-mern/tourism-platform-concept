import React, { useState } from 'react';
import NavLink from 'next/link';
import UserMenu from './components/UserMenu';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectUser } from '@/containers/users/usersSlice';
import ToolBarMenu from '@/components/UI/AppToolBar/components/ToolBarMenu';
import { usePathname } from 'next/navigation';
import { fetchTours } from '@/containers/tours/toursThunk';

const AppToolBar = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [navShow, setNavShow] = useState(false);
  const [menuShow, setMenuShow] = useState(false);
  const pathname = usePathname();

  const showMenu = () => {
    setMenuShow(!menuShow);
    dispatch(fetchTours);
  };

  const closeNavMenu = () => setNavShow(false);

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
          <NavLink
            href="/"
            className={`nav-link ${pathname === '/' ? 'active' : ''}`}
            onClick={closeNavMenu}
          >
            Home
          </NavLink>
          <NavLink
            href="/tours/all/1"
            className={`nav-link ${
              pathname === '/tours/all/1' ? 'active' : ''
            }`}
            onClick={closeNavMenu}
          >
            Tours
          </NavLink>
          <NavLink
            href="/about"
            className={`nav-link ${pathname === '/about' ? 'active' : ''}`}
            onClick={closeNavMenu}
          >
            About Us
          </NavLink>
          {user ? (
            <UserMenu user={user} onClick={closeNavMenu} pathname={pathname} />
          ) : (
            <div></div>
          )}
          <NavLink href="/news/all/1" className="nav-link">
            News
          </NavLink>
          <NavLink href="/reviews/all/1" className="nav-link">
            Reviews
          </NavLink>
          <NavLink href="/contactUs" className="nav-link">
            Contact Us
          </NavLink>
        </nav>
        <div className="user-menu">
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
