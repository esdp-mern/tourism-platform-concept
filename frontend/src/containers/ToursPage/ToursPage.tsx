import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { selectAllTours, selectFetchAllLoading } from '../../store/toursSlice';
import { fetchTours } from '../../store/toursThunk';
import TourItem from '../../components/TourItem/TourItem';
import './ToursPage.css';
import { Link } from 'react-router-dom';

const ToursPage = () => {
  const dispatch = useAppDispatch();
  const tours = useAppSelector(selectAllTours);
  const toursLoading = useAppSelector(selectFetchAllLoading);

  useEffect(() => {
    dispatch(fetchTours());
  }, [dispatch]);

  if (toursLoading) {
    return <div className="container">...Spinner</div>;
  }

  return (
    <div className="container">
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
  );
};

export default ToursPage;
