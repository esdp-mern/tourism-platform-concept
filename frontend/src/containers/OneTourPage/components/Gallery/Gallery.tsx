import React from 'react';
import { useAppSelector } from '@/store/hooks';
import { selectOneTour } from '@/containers/tours/toursSlice';
import { apiUrl } from '@/constants';

const Gallery = () => {
  const tour = useAppSelector(selectOneTour);

  return (
    <div className="one-tour-gallery">
      <h2>Tour Gallery</h2>
      <div className="one-tour-photos">
        {tour?.galleryTour.map((t, index) => (
          <div key={index.toString()}>
            <img src={apiUrl + '/' + t} alt={t} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
