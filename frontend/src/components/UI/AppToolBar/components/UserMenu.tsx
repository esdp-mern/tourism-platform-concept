import React from 'react';
import { User } from '@/type';
import NavLink from 'next/link';
import { userRoles } from '@/constants';

interface IProps {
  user: User;
}

const UserMenu: React.FC<IProps> = ({ user }) => {
  return (
    <>
      <NavLink href="/profile" className="nav-link profile-link">
        My profile
      </NavLink>
      {user && user.role === userRoles.admin && (
        <NavLink href="/tours/create" className="nav-link profile-link">
          Create Tour
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
