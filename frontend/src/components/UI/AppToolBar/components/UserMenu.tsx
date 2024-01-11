import React from 'react';
import { User } from '@/type';
import NavLink from 'next/link';
import { userRoles } from '@/constants';
import { T } from '@/store/translation';

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
        {T('/navbar', 'my_profile')}
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
          {T('/navbar', 'admin_page')}
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
          {T('/navbar', 'orders')}
        </NavLink>
      )}
    </>
  );
};

export default UserMenu;
