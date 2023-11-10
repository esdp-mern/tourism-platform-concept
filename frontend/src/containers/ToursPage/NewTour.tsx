import React from 'react';
import '../SignUpPage/SignUpPage.css';
import PageLoader from '../../components/Loaders/PageLoader';
import TourForm from '../../components/TourForm/TourForm';

const NewTour = () => {
  return (
    <div className="container sign-up-page">
      <PageLoader />
      <TourForm />
    </div>
  );
};

export default NewTour;
