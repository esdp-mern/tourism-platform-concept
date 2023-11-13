import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { fetchTour } from '../../store/toursThunk';
import {
  resetPostReviewError,
  selectOneTour,
  selectPostReviewError,
} from '../../store/toursSlice';
import OneTourInformation from './components/OneTourInformation/OneTourInformation';
import OneTourPlan from './components/OneTourPlan/OneTourPlan';
import { apiUrl } from '../../constants';
import './OneTourPage.css';
import PageLoader from '../../components/Loaders/PageLoader';
import { addAlert } from '../../store/usersSlice';
import OneTourOrderForm from './components/OneTourOrderForm/OneTourOrderForm';
import OneTourReview from './components/OneTourReview/OneTourReview';
import Map from './components/Map/Map';
import Gallery from './components/Gallery/Gallery';

interface ITab {
  title: string;
  name: string;
}

const TABS: ITab[] = [
  { title: 'Information', name: 'information' },
  { title: 'Tour plan', name: 'plan' },
  { title: 'Location', name: 'location' },
  { title: 'Gallery', name: 'gallery' },
  { title: 'Reviews', name: 'reviews' },
];

const OneTourPage = () => {
  const { id } = useParams() as {
    id: string;
  };

  const dispatch = useAppDispatch();
  const tour = useAppSelector(selectOneTour);
  const postReviewError = useAppSelector(selectPostReviewError);

  const [currentTab, setCurrentTab] = useState<string>('information');

  useEffect(() => {
    if (id) {
      dispatch(fetchTour(id));
    }
    if (postReviewError) {
      dispatch(addAlert({ message: postReviewError.message, type: 'error' }));
      dispatch(resetPostReviewError());
    }
  }, [id, dispatch, postReviewError]);
  const imgLink = apiUrl + '/' + tour?.mainImage;

  if (!tour) return <div>No such tour!</div>;

  const toggleTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;

    setCurrentTab(name);
  };

  return (
    <div className="one-tour">
      <PageLoader />
      <div className="one-tour-top">
        <img src={imgLink} className="one-tour-img" alt={tour.name} />
        <div className="one-tour-top-info">
          <div className="one-tour-top-line"></div>
          <h2 className="one-tour-top-title">{tour.name}</h2>
          <div className="one-tour-btns">
            <button className="one-tour-btn-one">Video Preview</button>
            <button className="one-tour-btn-two">View photos</button>
          </div>
        </div>
        <div className="one-tour-slider-btns">
          {TABS.map(({ title, name }) => (
            <button
              name={name}
              onClick={toggleTab}
              className={`one-tour-slider-${name}`}
              key={`${name}-tab`}
            >
              {title}
            </button>
          ))}
        </div>
      </div>
      <div className="container one-tour-tab">
        {currentTab === 'information' && <OneTourInformation />}
        {currentTab === 'plan' && <OneTourPlan />}
        {currentTab === 'location' && <Map country={tour.country} />}
        {currentTab === 'gallery' && <Gallery />}
        {currentTab === 'reviews' && <OneTourReview id={id} />}
        <OneTourOrderForm />
      </div>
    </div>
  );
};

export default OneTourPage;
