import React from 'react';
import NavLink from 'next/link';

interface IProps {
  onClick: () => void;
}

const AnonymousMenu: React.FC<IProps> = ({ onClick }) => {
  return (
    <>
      <NavLink href="/login" className="nav-link" onClick={onClick}>
        Sign in
      </NavLink>
    </>
  );
};

export default AnonymousMenu;
