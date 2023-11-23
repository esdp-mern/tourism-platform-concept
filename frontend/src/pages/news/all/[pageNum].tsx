import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectAllNews } from '@/containers/news/newsSlice';
import { fetchNews } from '@/containers/news/newsThunk';
import PageLoader from '@/components/Loaders/PageLoader';
import Pagination from '@/components/Pagination/Pagination';
import NewsItem from '@/components/NewsItem/NewsItem';

const AllNewsPage = () => {
  const dispatch = useAppDispatch();
  const news = useAppSelector(selectAllNews);
  const [newsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastRecord = currentPage * newsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - newsPerPage;
  const currentRecords = news.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(news.length / newsPerPage);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const onSetCurrentPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="news-page">
      <PageLoader />
      <div className="news-top">
        <img
          src="https://livedemo00.template-help.com/wt_prod-19282/images/bg-image-1.jpg"
          alt="nature"
          className="news-main-img"
        />
        <div className="news-top-info">
          <div className="news-top-line"></div>
          <h2 className="news-top-title">Tourism news</h2>
          <p className="news-top-txt">
            Here you can find interesting news about tourism in Central Asia!
          </p>
        </div>
      </div>
      <div className="container">
        <div className="news-main">
          {currentRecords.map((news) => (
            <div className="card-news" key={news._id}>
              <NewsItem news={news} key={news._id} />
            </div>
          ))}
        </div>
        <div className="news-pagination">
          <Pagination
            pathname={'/news/all/'}
            nPages={nPages}
            currentPage={currentPage}
            onSetCurrentPage={onSetCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default AllNewsPage;
