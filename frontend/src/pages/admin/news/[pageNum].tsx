import React, { useEffect, useState } from 'react';
import PageLoader from '@/components/Loaders/PageLoader';
import Pagination from '@/components/Pagination/Pagination';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/router';
import { selectUser } from '@/containers/users/usersSlice';
import { setIsLightMode } from '@/containers/config/configSlice';
import { userRoles } from '@/constants';
import { selectAllNews } from '@/containers/news/newsSlice';
import NewsItem from '@/components/NewsItem/NewsItem';
import { fetchAdminNews, fetchNews } from '@/containers/news/newsThunk';

const AllNewsPage = () => {
  const dispatch = useAppDispatch();
  const news = useAppSelector(selectAllNews);
  const routers = useRouter();
  const user = useAppSelector(selectUser);
  const [newsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentNews, setCurrentNews] = useState<
    'all' | 'published' | 'nonPublished'
  >('all');

  const indexOfLastRecord = currentPage * newsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - newsPerPage;
  const currentRecords = news.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(news.length / newsPerPage);

  useEffect(() => {
    dispatch(setIsLightMode(true));
    if (user && user.role !== userRoles.admin) {
      routers.push('/').then((r) => r);
    }
  }, [dispatch, routers, user]);

  useEffect(() => {
    switch (currentNews) {
      case 'all':
        dispatch(fetchAdminNews(true));
        break;
      case 'nonPublished':
        dispatch(fetchAdminNews());
        break;
      case 'published':
        dispatch(fetchNews());
        break;
      default:
        dispatch(fetchAdminNews(true));
        break;
    }
  }, [currentNews, dispatch]);

  const onSetCurrentPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="all-tours">
      <PageLoader />
      <div>
        <div className="container">
          <div>
            <div className="buttons-admin-tour">
              <button
                className="btn-admin-fetch-tour btn-admin-all"
                type="button"
                onClick={() => setCurrentNews('all')}
              >
                all
              </button>
              <button
                className="btn-admin-fetch-tour btn-admin-pub"
                type="button"
                onClick={() => setCurrentNews('published')}
              >
                published
              </button>
              <button
                className="btn-admin-fetch-tour btn-admin-non-pub"
                type="button"
                onClick={() => setCurrentNews('nonPublished')}
              >
                non published
              </button>
            </div>
            {!news || news.length <= 0 ? (
              <div className="title-none-tour">
                Unfortunately, there are no {currentNews} news.
              </div>
            ) : (
              <div>
                <div className="tours-admin-page">
                  {currentRecords.map((news) => (
                    <div className="card-news" key={news._id}>
                      <NewsItem news={news} key={news._id} />
                    </div>
                  ))}
                </div>
                <div className="tours-page-paginate">
                  <Pagination
                    pathname={'/admin/news/'}
                    nPages={nPages}
                    currentPage={currentPage}
                    onSetCurrentPage={onSetCurrentPage}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllNewsPage;
