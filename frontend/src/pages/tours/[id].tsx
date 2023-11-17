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
import OneTourInformation from '@/containers/OneTourPage/components/OneTourInformation/OneTourInformation';
import OneTourPlan from '@/containers/OneTourPage/components/OneTourPlan/OneTourPlan';
import Map from '@/containers/OneTourPage/components/Map/Map';
import Gallery from '@/containers/OneTourPage/components/Gallery/Gallery';
import OneTourReview from '@/containers/OneTourPage/components/OneTourReview/OneTourReview';
import OneTourOrderForm from '@/components/OneTourOrderForm/OneTourOrderForm';

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

  useEffect(() => {
    if (postReviewError) {
      // dispatch(addAlert({ message: postReviewError.message, type: 'error' }));
      dispatch(resetPostReviewError());
    }
  }, [dispatch, postReviewError]);

  const imgLink = apiUrl + '/' + tour?.mainImage;

  if (!tour) return <div>No such tour!</div>;

  const toggleTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;

    setCurrentTab(name);
  };

  return (
    <div className="one-tour">
      {/*<PageLoader />*/}
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
        <div>
          {currentTab === 'information' && <OneTourInformation />}
          {currentTab === 'plan' && <OneTourPlan />}
          {/*{currentTab === 'location' && <Map country={tour.country} />}*/}
          {currentTab === 'gallery' && <Gallery />}
          {currentTab === 'reviews' && <OneTourReview id={id} />}
        </div>
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
