import React from 'react';
import { Tour } from '@/type';
import { apiUrl } from '@/constants';

interface Props {
  tour: Tour;
}

const HotToursItem: React.FC<Props> = ({ tour }) => {
  return (
    <div className="hot-tours-item">
      <img src={apiUrl + '/' + tour.mainImage} alt="..." />
      <div>
        <h2>{tour.name}</h2>
        <p>{tour.price}</p>
      </div>
    </div>
  );
};

export default HotToursItem;
