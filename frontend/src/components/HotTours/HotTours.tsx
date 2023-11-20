import React from 'react';
import { useAppSelector } from '@/store/hooks';
import { selectAllTours } from '@/containers/tours/toursSlice';
import HotToursItem from '@/components/HotTours/components/HotToursItem/HotToursItem';

const HotTours = () => {
  const tours = useAppSelector(selectAllTours);

  const tour = tours[0];

  return (
    <div className="hot-tours-wrapper">
      <div className="container hot-tours-wrapper-inner">
        <HotToursItem tour={tour} />
        <div className="hot-tours-info">
          <div>
            <h2>
              Last
              <br />
              Minute
            </h2>
            <p>Offers</p>
          </div>
          <h4>
            We have picked some amazing last minute holiday offers for you to
            choose from. These offers won’t last too long so hurry and book
            yours today!
          </h4>
        </div>
      </div>
    </div>
  );
};

export default HotTours;
