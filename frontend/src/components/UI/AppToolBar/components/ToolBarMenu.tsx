import React from 'react';
import { useAppSelector } from '../../../../app/hook';
import { selectUser } from '../../../../store/usersSlice';
import { apiUrl } from '../../../../constants';

interface IProps {
  show: boolean;
  onClick: () => void;
}

const ToolBarMenu: React.FC<IProps> = ({ show, onClick }) => {
  const user = useAppSelector(selectUser);

  return (
    <div className={`tool-bar-menu ${show ? 'menu-active' : ''}`}>
      {user && (
        <div className="profile-preview">
          <img
            src={`${apiUrl}/${user.avatar}`}
            className="profile-preview-avatar"
            alt="profile-img"
          />
          <div>
            <h5>{user.displayName}</h5>
            <h6>{user.role}</h6>
          </div>
        </div>
      )}
      <button className="close-btn" onClick={onClick}>
        <span></span>
        <span></span>
      </button>
    </div>
  );
};

export default ToolBarMenu;
