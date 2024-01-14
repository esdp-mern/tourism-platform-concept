import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  addAlert,
  selectLogoutLoading,
  selectUser,
  setEditorModal,
} from '@/containers/users/usersSlice';
import AnonymousMenu from '@/components/UI/AppToolBar/components/AnonymousMenu';
import { usePathname } from 'next/navigation';
import ButtonLoader from '@/components/Loaders/ButtonLoader';
import { logout } from '@/containers/users/usersThunk';
import HotToursToolbar from '@/components/HotTours/HotToursToolbar';
import EditorModal from '@/components/EditProfile/EditorModal';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface IProps {
  show: boolean;
  onClick: () => void;
}

const ToolBarMenu: React.FC<IProps> = ({ show, onClick }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const logoutLoading = useAppSelector(selectLogoutLoading);
  const pathname = usePathname();
  const t = useTranslations('navbar');

  const userLogout = async () => {
    try {
      await dispatch(logout());
      dispatch(addAlert({ message: 'You have logged out!', type: 'info' }));
    } catch (e) {
      dispatch(addAlert({ message: 'Something is wrong!', type: 'error' }));
    }
  };

  const editBtn = t('edit_profile_btn');
  const logoutBtn = t('logout_btn');

  return (
    <>
      <EditorModal />
      <div
        className={`tool-bar-menu ${show ? 'menu-active' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {user && (
          <div className="profile-preview">
            <div className="profile-preview-avatar-and-name">
              <Image
                width={40}
                height={40}
                src={user.avatar}
                className="profile-preview-avatar"
                alt="profile-img"
              />
              <div>
                <h5>{user.displayName}</h5>
                <h6>{user.role}</h6>
              </div>
            </div>
            <div className="profile-preview-btns">
              <button
                className="edit-profile"
                onClick={() => {
                  dispatch(setEditorModal());
                  onClick();
                }}
              >
                {logoutLoading ? <ButtonLoader size={16} /> : `${editBtn}`}
              </button>
              <button
                className="logout"
                onClick={userLogout}
                disabled={logoutLoading}
              >
                {logoutLoading ? <ButtonLoader size={16} /> : `${logoutBtn}`}
              </button>
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
        <HotToursToolbar />
      </div>
    </>
  );
};

export default ToolBarMenu;
