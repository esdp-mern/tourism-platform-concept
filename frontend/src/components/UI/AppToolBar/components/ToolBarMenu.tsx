import React from 'react';
import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/containers/users/usersSlice';
import AnonymousMenu from '@/components/UI/AppToolBar/components/AnonymousMenu';
import { usePathname } from 'next/navigation';

interface IProps {
  show: boolean;
  onClick: () => void;
}

const ToolBarMenu: React.FC<IProps> = ({ show, onClick }) => {
  const user = useAppSelector(selectUser);
  const pathname = usePathname();

  return (
    <div
      className={`${show ? 'backdrop' : 'backdrop-hidden'}`}
      onClick={onClick}
    >
      <div className={`tool-bar-menu ${show ? 'menu-active' : ''}`}>
        {user && (
          <div className="profile-preview">
            <img
              src={user.avatar}
              className="profile-preview-avatar"
              alt="profile-img"
            />
            <div>
              <h5>{user.displayName}</h5>
              <h6>{user.role}</h6>
            </div>
          </div>
        )}
        {!user && (
          <div
            style={{
              borderBottom: '1px solid #ccc',
              padding: '10px',
              margin: '12px',
            }}
          >
            <AnonymousMenu onClick={onClick} pathname={pathname} />
          </div>
        )}
        <button className="close-btn" onClick={onClick}>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  );
};

export default ToolBarMenu;
