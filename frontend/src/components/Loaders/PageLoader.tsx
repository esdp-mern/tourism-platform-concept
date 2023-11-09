import React from 'react';
import './pageLoader.css';
import { useAppSelector } from '../../app/hook';
import { selectFetchAllLoading } from '../../store/toursSlice';

const PageLoader = () => {
  const pageLoading = useAppSelector(selectFetchAllLoading);

  return (
    <div className="page-loader-block">
      <div
        className={`page-loader ${pageLoading ? 'page-loader-enabled' : ''}`}
      >
        <div className="page-loader-inner bg">
          <span className="compass-direction" />
          <span className="compass-direction" />
          <span className="compass-direction">
            <span>E</span>
            <span>W</span>
          </span>
          <span className="compass-direction" />
          <span className="compass-direction" />
          <span className="compass-direction" />
          <span className="compass-direction">
            <span>N</span>
            <span>S</span>
          </span>
          <span className="compass-direction" />
          <span className="compass-direction-cover bg" />
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
