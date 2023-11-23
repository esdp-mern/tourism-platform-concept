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
        className={`nav-link ${pathname === '/login' ? 'active' : ''}`}
        onClick={onClick}
      >
        Sign in
      </NavLink>
    </>
  );
};

export default AnonymousMenu;
