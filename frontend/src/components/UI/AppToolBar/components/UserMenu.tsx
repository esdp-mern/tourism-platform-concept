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
            href="/admin/"
            className={`nav-link profile-link ${
              pathname === '/tours/create' ? 'active' : ''
            }`}
          >
            Admin Page
          </NavLink>
        </>
      )}
      {user && user.role === userRoles.moderator && (
        <NavLink href="/orders/allOrders" className="nav-link profile-link">
          Orders
        </NavLink>
      )}
      {user && user.role === userRoles.moderator && (
        <NavLink href="/orders/allOrders" className="nav-link profile-link">
          Orders
        </NavLink>
      )}
    </>
  );
};

export default UserMenu;
