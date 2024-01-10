import React, { useEffect } from 'react';
import { InferGetServerSidePropsType, NextPage } from 'next';
import { useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectAllNews, selectOneNews } from '@/containers/news/newsSlice';
import { fetchNews, fetchOneNews } from '@/containers/news/newsThunk';
import PageLoader from '@/components/Loaders/PageLoader';
import { apiUrl } from '@/constants';
import dayjs from 'dayjs';
import { wrapper } from '@/store/store';
import { fetchTour } from '@/containers/tours/toursThunk';
import { INews } from '@/type';
import Link from 'next/link';
import { setIsLightMode } from '@/containers/config/configSlice';
import { T } from '@/store/translation';

const OneNews: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
  const { id } = useParams() as {
    id: string;
  };
  const dispatch = useAppDispatch();
  const oneNews = useAppSelector(selectOneNews);
  const allNews = useAppSelector(selectAllNews);

  useEffect(() => {
    dispatch(setIsLightMode(false));
    dispatch(fetchOneNews(id));
    dispatch(fetchNews());
  }, [dispatch, id]);

  if (!oneNews) return <div>No such news!</div>;

  const arr: INews[] = [];

  allNews.map((news) => {
    if (
      news.category[0] === oneNews.category[0] &&
      news.title !== oneNews.title
    ) {
      arr.push(news);
    }
  });

  const items = arr.map((news) => (
    <div key={news.title} className="one-news-main-right-related-cards">
      <div>
        <img src={apiUrl + '/' + news.images[0]} alt={news.title} />
      </div>
      <Link
        href={`/news/${news._id}`}
        className="one-news-main-right-related-cards-link"
      >
        <div className="one-news-main-right-related-cards-title">
          {news.title}
        </div>
      </Link>
    </div>
  ));

  return (
    <div className="one-news-page">
      <PageLoader />
      <div className="news-top">
        <img
          src={apiUrl + '/' + oneNews.images[0]}
          className="news-main-img"
          alt={oneNews.title}
        />
        <div className="news-top-info">
          <div className="news-top-line"></div>
          <h2 className="news-top-title">{oneNews.title || '-'}</h2>
        </div>
      </div>
      <div className="container">
        <div className="one-news-main">
          <div className="one-news-main-left">
            <div className="one-news-main-info">
              <div className="one-news-main-info-date">
                {dayjs(oneNews.date).format('DD.MM.YYYY')}
              </div>
              <div className="one-news-main-info-category">
                {T('/news', `category`)}:{oneNews.category.join(', ')}
              </div>
            </div>
            <div className="one-news-main-description">
              {oneNews.description || '-'}
            </div>
            <div className="one-news-main-imgs">
              {oneNews.images.map((newsImg) => (
                <img src={apiUrl + '/' + newsImg} key={newsImg} alt={newsImg} />
              ))}
            </div>
          </div>
          <div className="one-news-main-right">
            <div className="one-news-categories">
              <h2 className="one-news-main-right-title">
                {T('/news', `categories`)}
              </h2>
              <div>
                <div className="one-news-main-right-categories">Places</div>
                <div className="one-news-main-right-categories">Animals</div>
                <div className="one-news-main-right-categories">Clothes</div>
                <div className="one-news-main-right-categories">Borders</div>
              </div>
            </div>
            <div className="one-news-related">
              <h2 className="one-news-main-right-related">
                {T('/news', `relatedNews`)}
              </h2>
              {arr.length === 0 ? (
                <div>{T('/news', `noRelatedNews`)}</div>
              ) : (
                items
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      const id = params?.id;

      if (!id || Array.isArray(id)) {
        throw new Error('Param id must be a string');
      }

      await store.dispatch(fetchTour(id));
      return { props: {} };
    },
);
export default OneNews;
