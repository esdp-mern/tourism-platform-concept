import React from 'react';

const PageLoader = () => {
  return (
    <div className="page-loader-block">
      <div className="page-loader">
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
