import React, { useEffect } from 'react';
import { userRoles } from '@/constants';
import Custom404 from '@/pages/404';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectUser } from '@/containers/users/usersSlice';
import PageLoader from '@/components/Loaders/PageLoader';
import EmployeeItem from '@/components/EmployeeItem/EmployeeItem';
import { setIsLightMode } from '@/containers/config/configSlice';

const All = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setIsLightMode(true));
  }, [dispatch]);

  if (!user || user.role !== userRoles.admin) {
    return <Custom404 errorType="tour" />;
  }

  return (
    <div>
      <PageLoader />
      <div className="fixed-toolbar"></div>
      <div>
        <div className="container">
          <div>
            <div className="employees-admin-page">
              <EmployeeItem />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default All;
