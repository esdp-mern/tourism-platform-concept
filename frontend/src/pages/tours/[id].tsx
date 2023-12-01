import React, { useEffect, useState } from 'react';
import { wrapper } from '@/store/store';
import { InferGetServerSidePropsType, NextPage } from 'next';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  resetPostReviewError,
  selectOneTour,
  selectPostReviewError,
} from '@/containers/tours/toursSlice';
import { fetchTour } from '@/containers/tours/toursThunk';
import { useParams } from 'next/navigation';
import { apiUrl } from '@/constants';
import OneTourInformation from '@/components/OneTourPage/OneTourInformation/OneTourInformation';
import OneTourPlan from '@/components/OneTourPage/OneTourPlan/OneTourPlan';
import Gallery from '@/components/OneTourPage/Gallery/Gallery';
import OneTourReview from '@/components/OneTourPage/OneTourReview/OneTourReview';
import OneTourOrderForm from '@/components/OneTourOrderForm/OneTourOrderForm';
import PageLoader from '@/components/Loaders/PageLoader';
import { fetchToursReviews } from '@/containers/reviews/reviewThunk';
import Custom404 from '@/pages/404';
import { fetchTourRating } from '@/containers/ratings/ratingThunk';

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

const TourPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
  const { id } = useParams() as {
    id: string;
  };
  const dispatch = useAppDispatch();
  const tour = useAppSelector(selectOneTour);
  const postReviewError = useAppSelector(selectPostReviewError);
  const [currentTab, setCurrentTab] = useState<string>('information');
  const [adaptiveTabBtns, setAdaptiveTabBtns] = useState('');

  useEffect(() => {
    if (postReviewError) {
      dispatch(resetPostReviewError());
    }
    dispatch(fetchTour(id));
    dispatch(fetchToursReviews(id));
    dispatch(fetchTourRating(id));
  }, [dispatch, postReviewError, id]);

  if (!tour) return <Custom404 errorType="tour" />;

  const toggleTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    setCurrentTab(name);
    closeNav();
  };

  const closeNav = () => {
    if (adaptiveTabBtns === '') return;
    setAdaptiveTabBtns('closed');
    setTimeout(() => {
      setAdaptiveTabBtns('');
    }, 300);
  };

  const navBtnToggle = () => {
    if (adaptiveTabBtns === 'open') {
      closeNav();
      return;
    }
    setAdaptiveTabBtns('open');
  };

  return (
    <div className="one-tour" onClick={() => closeNav()}>
      <PageLoader />
      <div className="one-tour-top">
        <div
          className="one-tour-top-info"
          style={{
            backgroundImage: `url('${apiUrl + '/' + tour.mainImage}')`,
          }}
        >
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
              className={
                currentTab === name
                  ? `one-tour-slider-${name} btn-active`
                  : `one-tour-slider-${name} one-tour-slider-btns-btn`
              }
              key={`${name}-tab`}
            >
              <span>{title}</span>
            </button>
          ))}
        </div>
        <div
          className="adaptive-one-tour-slider-btns"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="show-tour-tab-btns" onClick={navBtnToggle}>
            <span>Navigation</span>
          </button>
          <div className={`tour-tab-btns tour-tab-btns-${adaptiveTabBtns}`}>
            {TABS.map(({ title, name }) => (
              <button
                name={name}
                onClick={toggleTab}
                className={`tour-tab-btn tour-tab-btn-${name}`}
                key={`${name}-tab`}
              >
                <span>{title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="container one-tour-tab">
        <>
          {currentTab === 'information' && <OneTourInformation />}
          {currentTab === 'plan' && <OneTourPlan />}
          {currentTab === 'gallery' && <Gallery />}
          {currentTab === 'reviews' && <OneTourReview />}
        </>
        <OneTourOrderForm />
      </div>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      const id = params?.id;

      if (!id || Array.isArray(id)) {
        throw new Error('Param id must be a string');
      }

      await store.dispatch(fetchTour(id));
      return { props: {} };
    },
);
export default TourPage;
