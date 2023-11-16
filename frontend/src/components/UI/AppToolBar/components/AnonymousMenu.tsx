import React from 'react';
import NavLink from 'next/link';

const AnonymousMenu = () => {
  return (
    <>
      <NavLink href="/register" className="nav-link">
        Sign up
      </NavLink>
      <NavLink href="/login" className="nav-link">
        Sign in
      </NavLink>
    </>
  );
};

export default AnonymousMenu;
