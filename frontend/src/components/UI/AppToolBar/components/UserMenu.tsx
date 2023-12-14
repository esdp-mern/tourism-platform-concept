import React from 'react';
import { User } from '@/type';
import NavLink from 'next/link';
import { userRoles } from '@/constants';

interface IProps {
  user: User;
  onClick: () => void;
  pathname: string;
}

const UserMenu: React.FC<IProps> = ({ user, onClick, pathname }) => {
  return (
    <>
      <NavLink
        href="/profile"
        className={`nav-link profile-link ${
          pathname === '/profile' ? 'active' : ''
        }`}
        onClick={onClick}
      >
        My profile
      </NavLink>
      {user && user.role === userRoles.admin && (
        <NavLink
          href="/admin"
          as="/admin"
          className={`nav-link profile-link ${
            pathname === '/admin' ? 'active' : ''
          }`}
          onClick={onClick}
        >
          Admin Page
        </NavLink>
      )}
      {user && user.role === userRoles.moderator && (
        <NavLink
          href="/orders/allOrders"
          as="/orders/allOrders"
          className={`nav-link profile-link ${
            pathname === '/orders/allOrders' ? 'active' : ''
          }`}
          onClick={onClick}
        >
          Orders
        </NavLink>
      )}
    </>
  );
};

export default UserMenu;
