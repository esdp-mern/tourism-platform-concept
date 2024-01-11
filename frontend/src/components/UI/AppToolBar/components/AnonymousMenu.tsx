import React from 'react';
import NavLink from 'next/link';
import { T } from '@/store/translation';

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
        {T('/navbar', 'sign_in')}
      </NavLink>
      <NavLink
        href="/register"
        className={`form-link ${pathname === '/register' ? 'active' : ''}`}
        onClick={onClick}
      >
        {T('/navbar', 'sign_up')}
      </NavLink>
    </>
  );
};

export default AnonymousMenu;
