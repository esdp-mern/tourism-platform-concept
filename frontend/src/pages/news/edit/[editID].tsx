import React, { useEffect } from 'react';
import { InferGetServerSidePropsType, NextPage } from 'next';
import { wrapper } from '@/store/store';
import { fetchOneNews } from '@/containers/news/newsThunk';
import PageLoader from '@/components/Loaders/PageLoader';
import NewsForm from '@/components/Forms/NewsForm/NewsForm';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useParams } from 'next/navigation';
import { selectUser } from '@/containers/users/usersSlice';
import { setIsLightMode } from '@/containers/config/configSlice';
import { userRoles } from '@/constants';
import Custom404 from '@/pages/404';
import { selectOneNews } from '@/containers/news/newsSlice';

const EditNews: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
  const dispatch = useAppDispatch();
  const news = useAppSelector(selectOneNews);
  const { editID } = useParams() as {
    editID: string;
  };

  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(setIsLightMode(true));
    if (editID) {
      dispatch(fetchOneNews(editID));
    }
  }, [editID, dispatch]);

  if (!user || user.role !== userRoles.admin) {
    return <Custom404 errorType="tour" />;
  }

  let editingNews;

  if (news) {
    editingNews = {
      title: news.title,
      category: news.category,
      description: news.description,
      images: null,
    };
  }

  return (
    <div className="container sign-up-page">
      <PageLoader />
      {editingNews && (
        <NewsForm isEdit existingNews={editingNews} idNews={news?._id} />
      )}
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      const editID = params?.editID;

      if (!editID || Array.isArray(editID)) {
        throw new Error('Param id must be a string');
      }

      await store.dispatch(fetchOneNews(editID));
      return { props: {} };
    },
);
export default EditNews;
