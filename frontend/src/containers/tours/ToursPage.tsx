import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectAllTours } from '@/containers/tours/toursSlice';
import TourListItem from '@/components/TourListItem/TourListItem';
import { fetchTours } from '@/containers/tours/toursThunk';
import MainSlider from '@/components/MainSlider/MainSlider';
import Link from 'next/link';
import PageLoader from '@/components/Loaders/PageLoader';
import HotTours from '@/components/HotTours/HotTours';

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
            <Link href={`/tours/all/${1}`} className="tours-page-link-tours">
              See all tours
            </Link>
          </div>
        </div>
        <HotTours />
      </div>
    </>
  );
};

export default ToursPage;
