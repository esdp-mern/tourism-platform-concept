import React, { useEffect } from 'react';
import PageLoader from '@/components/Loaders/PageLoader';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/router';
import { selectUser } from '@/containers/users/usersSlice';
import { userRoles } from '@/constants';
import { Fade } from 'react-awesome-reveal';
import Link from 'next/link';
import { setIsLightMode } from '@/containers/config/configSlice';

const Admin = () => {
  const routers = useRouter();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user || user.role !== userRoles.admin) {
      routers.push('/').then((r) => r);
    }
    dispatch(setIsLightMode(true));
  }, [dispatch, routers, user]);
  return (
    <>
      <PageLoader />
      <div className="container">
        <div className="tours-page">
          <Fade>
            <div className="admin-item">
              <Link href={`/admin/tours/1`} className="tour-item-links">
                <h2 className="tour-item-title">TOURS</h2>
              </Link>
            </div>
            <div className="news-item">
              <Link href={`/admin/news/1`} className="news-item-links">
                <h2 className="news-item-title">NEWS</h2>
              </Link>
            </div>
            <div className="users-item">
              <Link href={`/admin/allUsers/1`} className="users-item-links">
                <h2 className="news-item-title">USERS</h2>
              </Link>
            </div>
          </Fade>
        </div>
      </div>
    </>
  );
};

export default Admin;
