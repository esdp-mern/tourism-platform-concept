import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectAllTours } from '@/containers/tours/toursSlice';
import TourListItem from '@/components/TourListItem/TourListItem';
import { fetchTours } from '@/containers/tours/toursThunk';
import MainSlider from '@/components/MainSlider/MainSlider';

const ToursPage = () => {
  const tours = useAppSelector(selectAllTours);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTours());
  }, [dispatch]);

  return (
    <>
      <MainSlider />
      <div className="featured-tours">
        <div className="container">
          <h2 className="tours-page-title">Featured Tours</h2>
          <div className="tours-page">
            {tours.map((tour) => (
              <TourListItem tour={tour} key={tour._id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ToursPage;
