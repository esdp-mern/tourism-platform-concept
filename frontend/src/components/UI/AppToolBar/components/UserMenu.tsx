import React from 'react';
import { User } from '@/type';
import NavLink from 'next/link';
import { userRoles } from '@/constants';

interface IProps {
  user: User;
  onClick: () => void;
}

const UserMenu: React.FC<IProps> = ({ user, onClick }) => {
  return (
    <>
      <NavLink
        href="/profile"
        className="nav-link profile-link"
        onClick={onClick}
      >
        My profile
      </NavLink>
      {user && user.role === userRoles.admin && (
        <NavLink
          href="/tours/create"
          className="nav-link profile-link"
          onClick={onClick}
        >
          Create Tour
        </NavLink>
      )}
    </>
  );
};

export default UserMenu;
