import React from 'react';
import { NavLink } from 'react-router-dom';
import { User } from '../../../../type';
import { userRoles } from '../../../../constants';

interface IProps {
  user: User;
}

const UserMenu: React.FC<IProps> = ({ user }) => {
  return (
    <>
      <NavLink to="/profile" className="nav-link profile-link">
        My profile
      </NavLink>
      {user && user.role === userRoles.admin && (
        <NavLink to="/tours/create" className="nav-link profile-link">
          Create Tour
        </NavLink>
      )}
    </>
  );
};

export default UserMenu;
