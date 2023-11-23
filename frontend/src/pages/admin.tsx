import React, { useEffect } from 'react';
import PageLoader from '@/components/PageLoader/PageLoader';
import { useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/router';
import { selectUser } from '@/containers/users/usersSlice';
import { userRoles } from '@/constants';
import { Fade } from 'react-awesome-reveal';
import Link from 'next/link';

const Admin = () => {
  const routers = useRouter();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (user && user.role !== userRoles.admin) {
      routers.push('/').then((r) => r);
    }
  }, [routers, user]);
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
          </Fade>
        </div>
      </div>
    </>
  );
};

export default Admin;
