import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectHotTours } from '@/containers/tours/toursSlice';
import { apiUrl } from '@/constants';
import { fetchTours } from '@/containers/tours/toursThunk';
import Link from 'next/link';

const HotToursToolbar = () => {
  const carouselTours = useAppSelector(selectHotTours);
  const dispatch = useAppDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchTours({}));
  }, [dispatch]);
  const goToSlide = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex(index);
  };

  return (
    <div className="hot-tours-toolbar-wrap">
      <div className="hot-tours-toolbar">
        <div className="hot-tours-toolbar-inner">
          {carouselTours.map((tour, id) => (
            <div
              className={`hot-tour-toolbar ${
                id === currentIndex
                  ? `hot-tours-toolbar-0`
                  : `hot-tour-toolbar-1`
              }`}
              key={tour._id}
            >
              <img
                src={apiUrl + '/' + tour.mainImage}
                alt="..."
                className="hot-tour-toolbar-img"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="hot-tour-toolbar-sale">- 30%</div>
              <div className="hot-tour-toolbar-info">
                <Link
                  href={`/tours/${tour._id}`}
                  className="hot-tour-toolbar-link"
                >
                  <h4>{tour.name}</h4>
                </Link>
                <div onClick={(e) => e.stopPropagation()}>
                  <span className="hot-tour-toolbar-old-price">$9999</span>
                  <span className="hot-tour-toolbar-price">${tour.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          className="hot-tours-toolbar-dots"
          onClick={(e) => e.stopPropagation()}
        >
          {carouselTours.map((tour, id) => (
            <div
              className={
                currentIndex === id
                  ? 'hot-tours-toolbar-dot-active'
                  : 'hot-tours-toolbar-dot-hide'
              }
              key={tour._id}
              id={id.toString()}
              onClick={(e) => goToSlide(id, e)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotToursToolbar;
