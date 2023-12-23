import React from 'react';
import { INews } from '@/type';
import { apiUrl, userRoles } from '@/constants';
import { Fade } from 'react-awesome-reveal';
import Link from 'next/link';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectUser } from '@/containers/users/usersSlice';
import {
  deleteNews,
  fetchNews,
  publishNews,
} from '@/containers/news/newsThunk';
import { selectDeleteTourLoading } from '@/containers/tours/toursSlice';
import { selectNewsPublishLoading } from '@/containers/news/newsSlice';

interface Props {
  news: INews;
}

const NewsItem: React.FC<Props> = ({ news }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const publishLoading = useAppSelector(selectNewsPublishLoading);
  const deleteLoading = useAppSelector(selectDeleteTourLoading);

  const onDelete = async () => {
    if (window.confirm('Are you sure you want to delete this news?')) {
      await dispatch(deleteNews(news._id));
      dispatch(fetchNews());
    }
  };

  const onPublish = async () => {
    if (window.confirm('Are you sure you want to publish this news?')) {
      await dispatch(publishNews(news._id));
      dispatch(fetchNews());
    }
  };

  return (
    <Fade>
      <div className="card-news-img">
        <Link href={`/news/${news._id}`}>
          <div className="card-news-img-wrap">
            <img src={apiUrl + '/' + news.images[0]} alt={news.title} />
            {user && user.role === userRoles.admin ? (
              <div
                className={`${
                  news.isPublished ? 'published-tour' : 'unpublished-tour'
                } tour-info-publish`}
              >
                {news.isPublished ? 'published' : 'unpublished'}
              </div>
            ) : null}
          </div>
        </Link>
        <div className="card-news-date">
          {dayjs(news.date).format('DD.MM.YYYY')}
        </div>
        {user && user.role === userRoles.admin ? (
          <div className="buttons-news">
            <button
              className="btn-delete-tour"
              type="button"
              onClick={onDelete}
              disabled={deleteLoading ? deleteLoading === news._id : false}
            >
              {deleteLoading && deleteLoading === news._id
                ? 'deleting...'
                : 'Delete'}
            </button>
            <button
              className="btn-publish-tour"
              type="button"
              onClick={onPublish}
              disabled={publishLoading ? publishLoading === news._id : false}
            >
              {publishLoading && publishLoading === news._id
                ? news.isPublished
                  ? 'unpublishing...'
                  : 'publishing...'
                : news.isPublished
                  ? 'Unpublish'
                  : 'Publish'}
            </button>
            <Link href={`/news/edit/${news._id}`} className="btn-tour-edit">
              Edit
            </Link>
          </div>
        ) : null}
        <hr className="card-news-line" />
        <Link href={`/news/${news._id}`} className="news-item-link">
          <div className="one-news-title">{news.title}</div>
        </Link>
      </div>
    </Fade>
  );
};

export default NewsItem;
