import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { selectAllTours } from '../../store/toursSlice';
import { fetchTours } from '../../store/toursThunk';
import TourItem from '../../components/TourItem/TourItem';
import './ToursPage.css';
import { Link } from 'react-router-dom';
import PageLoader from '../../components/Loaders/PageLoader';
import MainSlider from '../../components/MainSlider/MainSlider';

const ToursPage = () => {
  const dispatch = useAppDispatch();
  const tours = useAppSelector(selectAllTours);

  useEffect(() => {
    dispatch(fetchTours());
  }, [dispatch]);

  return (
    <>
      <MainSlider />
      <div className="featured-tours">
        <div className="container">
          <PageLoader />
          <h2 className="tours-page-title">Featured Tours</h2>
          <div className="tours-page">
            {tours.slice(0, 6).map((tour) => (
              <TourItem tour={tour} key={tour._id} />
            ))}
          </div>
          <div className="tours-page-link">
            <Link to="tours/all" className="tours-page-link-tours">
              See all tours
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToursPage;
