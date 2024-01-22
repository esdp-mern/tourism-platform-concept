import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import PageLoader from '@/components/Loaders/PageLoader';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useParams } from 'next/navigation';
import { selectUser } from '@/containers/users/usersSlice';
import { setIsLightMode } from '@/containers/config/configSlice';
import { userRoles } from '@/constants';
import Custom404 from '@/pages/404';
import NewsForm from '@/components/Forms/NewsForm/NewsForm';

const EditNews = () => {
  const dispatch = useAppDispatch();
  const { editID } = useParams() as {
    editID: string;
  };

  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(setIsLightMode(true));
  }, [dispatch]);

  if (!user || user.role !== userRoles.admin) {
    return <Custom404 errorType="tour" />;
  }

  return (
    <div className="container sign-up-page">
      <PageLoader />
      <NewsForm isEdit idNews={editID} />
    </div>
  );
};

export default EditNews;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: (
        await import(`../../../../public/locales/${locale}/translation.json`)
      ).default,
    },
  };
};
