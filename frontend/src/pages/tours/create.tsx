import React, { useEffect } from 'react';
import PageLoader from '@/components/Loaders/PageLoader';
import TourForm from '@/components/Forms/TourForm/TourForm';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectUser } from '@/containers/users/usersSlice';
import { userRoles } from '@/constants';
import Custom404 from '@/pages/404';
import { setIsLightMode } from '@/containers/config/configSlice';

const NewTour = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setIsLightMode(true));
  }, [dispatch]);

  const user = useAppSelector(selectUser);

  if (!user || user.role !== userRoles.admin) {
    return <Custom404 errorType="tour" />;
  }
  return (
    <div className="container sign-up-page">
      <PageLoader />
      <TourForm />
    </div>
  );
};
export default NewTour;
