import React from 'react';
import NavLink from 'next/link';

interface IProps {
  onClick: () => void;
  pathname: string;
}

const AnonymousMenu: React.FC<IProps> = ({ onClick, pathname }) => {
  return (
    <>
      <NavLink
        href="/login"
        className={`form-link ${pathname === '/login' ? 'active' : ''}`}
        onClick={onClick}
      >
        Sign in
      </NavLink>
      <NavLink
        href="/register"
        className={`form-link ${pathname === '/register' ? 'active' : ''}`}
        onClick={onClick}
      >
        Sign up
      </NavLink>
    </>
  );
};

export default AnonymousMenu;
