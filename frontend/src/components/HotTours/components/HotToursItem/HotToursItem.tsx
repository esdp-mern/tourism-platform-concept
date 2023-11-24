import React from 'react';
import { Tour } from '@/type';
import { apiUrl } from '@/constants';
import NavLink from 'next/link';

interface Props {
  tour: Tour;
}

const HotToursItem: React.FC<Props> = ({ tour }) => {
  return (
    <div className="hot-tours-item">
      <NavLink href={`/tours/${tour._id}`} className="hot-tours-item-preview">
        <img src={apiUrl + '/' + tour.mainImage} alt="..." />
        <div className="hot-tours-item-badge">-30%</div>
      </NavLink>
      <div className="hot-tours-item-info">
        <p className="hot-tours-item-title">
          <NavLink
            href={`/tours/${tour._id}`}
            className="hot-tours-item-title-link"
          >
            {tour.name}
          </NavLink>
        </p>
        <div className="hot-tours-item-pricing">
          <p className="hot-tours-item-price hot-tours-item-price-old">$9999</p>
          <p className="hot-tours-item-price hot-tours-item-price-new">
            ${tour.price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HotToursItem;
