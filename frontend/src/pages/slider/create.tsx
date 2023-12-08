import React, { useEffect } from 'react';
import PageLoader from '@/components/Loaders/PageLoader';
import MainSliderForm from '@/components/Forms/MainSliderForm/MainSliderForm';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setIsLightMode } from '@/containers/config/configSlice';
import { selectUser } from '@/containers/users/usersSlice';
import { userRoles } from '@/constants';
import Custom404 from '@/pages/404';

const NewSlider = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setIsLightMode(true));
  }, [dispatch]);

  const user = useAppSelector(selectUser);

  if (!user || user.role !== userRoles.admin) {
    return <Custom404 errorType="tour" />;
  }
  return (
    <div className="container">
      <PageLoader />
      <div className="form-block">
        <MainSliderForm />
      </div>
    </div>
  );
};

export default NewSlider;
