import React, { useEffect, useState } from 'react';
import PageLoader from '@/components/Loaders/PageLoader';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchGuideReviews,
  fetchPlatformReviews,
  fetchToursReviews,
} from '@/containers/reviews/reviewThunk';
import {
  selectGuidesReviews,
  selectPlatformReviews,
  selectToursReviews,
} from '@/containers/reviews/reviewSlice';
import { allReviews } from '@/type';
import Pagination from '@/components/Pagination/Pagination';
import ReviewItem from '@/components/ReviewItem/ReviewItem';

const ReviewsPage = () => {
  const dispatch = useAppDispatch();
  let arr: allReviews[] = [];
  const toursReviews = useAppSelector(selectToursReviews);
  const guidesReviews = useAppSelector(selectGuidesReviews);
  const platformReviews = useAppSelector(selectPlatformReviews);
  arr = [...toursReviews, ...guidesReviews, ...platformReviews];
  const [reviewsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastRecord = currentPage * reviewsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - reviewsPerPage;
  const currentRecords = arr.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(arr.length / reviewsPerPage);

  const onSetCurrentPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(fetchToursReviews());
    dispatch(fetchGuideReviews());
    dispatch(fetchPlatformReviews());
  }, [dispatch]);

  return (
    <div className="reviews-page">
      <PageLoader />
      <div className="reviews-top">
        <img
          src="https://livedemo00.template-help.com/wt_prod-19282/images/bg-image-1.jpg"
          alt="nature"
          className="reviews-main-img"
        />
        <div className="reviews-top-info">
          <div className="reviews-top-line"></div>
          <p className="reviews-top-txt">
            Here you can find all reviews about our company, tours and guides!
          </p>
        </div>
      </div>
      <div className="container">
        <div className="reviews-main">
          {currentRecords.map((reviews) => (
            <ReviewItem reviews={reviews} key={reviews._id} />
          ))}
        </div>
        <div className="reviews-pagination">
          <Pagination
            pathname={'/reviews/all/'}
            nPages={nPages}
            currentPage={currentPage}
            onSetCurrentPage={onSetCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;
