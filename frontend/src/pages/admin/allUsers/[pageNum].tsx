import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectUser, selectUsers } from '@/containers/users/usersSlice';
import { setIsLightMode } from '@/containers/config/configSlice';
import { editUserRole, getUsers } from '@/containers/users/usersThunk';
import { User } from '@/type';
import { apiUrl, userRoles } from '@/constants';
import PageLoader from '@/components/Loaders/PageLoader';
import Custom404 from '@/pages/404';
import Pagination from '@/components/Pagination/Pagination';

const PageNum = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const user = useAppSelector(selectUser);
  const usersPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCardId, setSelectedCardId] = useState('');
  const [roles, setRoles] = useState<string[]>([]);
  const indexOfLastRecord = currentPage * usersPerPage;
  const indexOfFirstRecord = indexOfLastRecord - usersPerPage;
  const currentRecords = users.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(users.length / usersPerPage);

  useEffect(() => {
    document.addEventListener('click', () => setSelectedCardId(''));
    if (!roles.length) {
      setRoles(Object.keys(userRoles).map((key) => key));
    }
    dispatch(setIsLightMode(true));
    dispatch(getUsers(''));
  }, [dispatch, roles]);

  if (!user || user.role !== userRoles.admin) {
    return <Custom404 errorType="tour" />;
  }

  const onSetCurrentPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container">
      <PageLoader />
      <div className="all-users">
        {currentRecords.map((user: User) => (
          <div className="user-card" key={user._id}>
            <div className="user-card-top">
              <img
                src={
                  (user.avatar?.slice(0, 5) === 'https' ? '' : `${apiUrl}/`) +
                  user.avatar
                }
                alt={user.avatar || 'user'}
              />
            </div>
            <div className="user-card-bottom">
              <h3 className="user-card-displayName">{user.displayName}</h3>
              <span>@{user.username}</span>
              <span>{user.email}</span>
              <span
                className={`user-card-role ${
                  selectedCardId === user._id ? 'user-card-role-selected' : ''
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (selectedCardId === user._id) {
                    return setSelectedCardId('');
                  }
                  setSelectedCardId(user._id);
                }}
              >
                {user.role}
                <span
                  className={`user-card-roles ${
                    selectedCardId === user._id ? 'user-card-roles-open' : ''
                  }`}
                >
                  {roles.map(
                    (role) =>
                      user.role !== role && (
                        <span
                          key={role}
                          onClick={async () => {
                            await dispatch(
                              editUserRole({ id: user._id, role }),
                            );
                            dispatch(getUsers(''));
                          }}
                        >
                          {role}
                        </span>
                      ),
                  )}
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>
      {users.length > 8 && (
        <Pagination
          pathname={'/admin/allUsers/'}
          nPages={nPages}
          currentPage={currentPage}
          onSetCurrentPage={onSetCurrentPage}
        />
      )}
    </div>
  );
};

export default PageNum;