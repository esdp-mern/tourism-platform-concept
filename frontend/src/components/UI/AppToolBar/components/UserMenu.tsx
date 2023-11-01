import React from 'react';
import { NavLink } from 'react-router-dom';
import { User } from '../../../../type';

interface IProps {
  user: User;
}

const UserMenu: React.FC<IProps> = ({ user }) => {
  return (
    <>
      <NavLink to="/profile" className="nav-link profile-link">
        My profile
      </NavLink>
    </>
  );
};

export default UserMenu;
