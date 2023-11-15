import React from 'react';
import { Tour } from '@/type';
import Link from 'next/link';
import { Fade } from 'react-awesome-reveal';
import { apiUrl } from '@/constants';

interface Props {
  tour: Tour;
}

const TourItem: React.FC<Props> = ({ tour }) => {
  const imgLink = apiUrl + '/' + tour.mainImage;

  return (
    <Fade>
      <div className="tour-item">
        <Link href={`/tours/${tour._id}`} className="tour-item-links">
          <div className="tour-item-top">
            <img src={imgLink} alt={tour.name} className="tour-item-img" />
            <div className="tour-item-price">{tour.price.toString()} KGS</div>
          </div>
        </Link>
        <div className="tour-item-bottom">
          <Link href={`/tours/${tour._id}`} className="tour-item-links">
            <h2 className="tour-item-title">{tour.name}</h2>
          </Link>
          <div className="tour-item-country">{tour.country}</div>
          <div className="tour-item-info">
            <div className="tour-item-duration">{tour.duration} days</div>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default TourItem;
