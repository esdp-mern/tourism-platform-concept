import React from 'react';
import './pageLoader.css';
import { useAppSelector } from '../../app/hook';
import { selectFetchAllLoading } from '../../store/toursSlice';

const PageLoader = () => {
  const pageLoading = useAppSelector(selectFetchAllLoading);

  return (
    <div className={`page-loader ${pageLoading ? 'page-loader-enabled' : ''}`}>
      <div className="page-loader-inner" />
    </div>
  );
};

export default PageLoader;
