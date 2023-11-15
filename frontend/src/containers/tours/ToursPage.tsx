import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectAllTours } from '@/containers/tours/toursSlice';
import TourListItem from '@/components/TourListItem/TourListItem';
import { Link } from 'react-router-dom';
import { fetchTours } from '@/containers/tours/toursThunk';

const ToursPage = () => {
  const tours = useAppSelector(selectAllTours);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchTours());
  }, [dispatch]);

  return (
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
          <Link to="tours/all" className="tours-page-link-tours">
            See all tours
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ToursPage;
