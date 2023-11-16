import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectAllTours } from '@/containers/tours/toursSlice';
import TourListItem from '@/components/TourListItem/TourListItem';
import { fetchTours } from '@/containers/tours/toursThunk';
import MainSlider from '@/components/MainSlider/MainSlider';
import Link from 'next/link';
import PageLoader from '@/components/PageLoader/PageLoader';

const ToursPage = () => {
  const tours = useAppSelector(selectAllTours);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTours());
  }, [dispatch]);

  return (
    <>
      <MainSlider />
      <PageLoader />
      <div className="featured-tours">
        <div className="container">
          <h2 className="tours-page-title">Featured Tours</h2>
          <div className="tours-page">
            {tours.slice(0, 6).map((tour) => (
              <TourListItem tour={tour} key={tour._id} />
            ))}
          </div>
          <div className="tours-page-link">
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <Link href="/tours/all" className="tours-page-link-tours">
              See all tours
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToursPage;
