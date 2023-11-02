import React from "react";
import "./pageLoader.css";
import { useAppSelector } from "../../app/hook";
import { selectFetchAllLoading } from "../../store/toursSlice";

const PageLoader = () => {
  const pageLoading = useAppSelector(selectFetchAllLoading);

  return (
    <div className={`page-loader ${pageLoading && "enabled"}`}>
      <div className="page-loader-inner">
        <div className="page-loader-top">
          <div className="loader-sun">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="page-loader-bottom">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
