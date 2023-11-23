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
        <>
          <NavLink href="/tours/create" className="nav-link profile-link">
            Create Tour
          </NavLink>
          <NavLink href="/admin/" className="nav-link profile-link">
            Admin Page
          </NavLink>
        </>
      )}
    </>
  );
};

export default UserMenu;
