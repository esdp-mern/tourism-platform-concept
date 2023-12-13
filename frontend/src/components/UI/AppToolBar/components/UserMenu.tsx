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
        <>
          <NavLink
            href="/tours/create"
            className={`nav-link profile-link ${
              pathname === '/tours/create' ? 'active' : ''
            }`}
            onClick={onClick}
          >
            Create Tour
          </NavLink>
          <NavLink
            href="/admin"
            className={`nav-link profile-link ${
              pathname === '/admin' ? 'active' : ''
            }`}
          >
            Admin Page
          </NavLink>
        </>
      )}
      {user && user.role === userRoles.moderator && (
        <NavLink
          href="/orders/allOrders"
          as="/orders/allOrders"
          className={`nav-link profile-link ${
            pathname === '/orders/allOrders' ? 'active' : ''
          }`}
        >
          Orders
        </NavLink>
      )}
    </>
  );
};

export default UserMenu;
