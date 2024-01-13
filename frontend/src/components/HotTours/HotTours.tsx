import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { selectAllTours } from '@/containers/tours/toursSlice';
import HotToursItem from '@/components/HotTours/components/HotToursItem/HotToursItem';
import arrowRightIcon from '@/assets/images/arrow-right.svg';
import { Tour } from '@/type';
import { useTranslations } from 'next-intl';

const HotTours = () => {
  const tours = useAppSelector(selectAllTours);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [carouselTours, setCarouselTours] = useState<Tour[]>([]);
  const t = useTranslations('main');

  useEffect(() => {
    if (tours.length) {
      setCarouselTours(tours.slice(0, 4));
    }
  }, [tours]);

  const slide = useCallback(
    (isNext: boolean) => {
      if (!carouselRef.current || !carouselTours.length) return;

      const ms = 250;

      const x = carouselRef.current.children[0].clientWidth + 30;

      carouselRef.current.style.cssText = `
        transition: all ${ms}ms ease 0s;
        transform: translateX(${isNext ? '-' : ''}${x}px);
      `;

      setTimeout(() => {
        if (!carouselRef.current) return;
        carouselRef.current.style.cssText = `
            transition: none;
            transform: translateX(0);
          `;

        setCarouselTours((prevState) => {
          const newState = [...prevState];

          const lastOrFirstCarouselTour =
            newState[isNext ? newState.length - 1 : 0];

          if (isNext) {
            newState.shift();
          } else {
            newState.pop();
          }

          let lastOrFirstTour = tours.findIndex(
            (tour) => tour._id === lastOrFirstCarouselTour._id,
          );

          if (isNext) {
            if (lastOrFirstTour === tours.length - 1) {
              lastOrFirstTour = -1;
            }
            newState.push(tours[lastOrFirstTour + 1]);
          } else {
            if (lastOrFirstTour === 0) {
              lastOrFirstTour = tours.length - 1;
            }
            newState.unshift(tours[lastOrFirstTour - 1]);
          }

          return newState;
        });
      }, ms);
    },
    [carouselTours.length, tours],
  );

  useEffect(() => {
    const interval = setInterval(() => slide(true), 3000);

    return () => {
      clearInterval(interval);
    };
  }, [slide]);

  return (
    <div className="hot-tours-wrapper">
      <div className="container hot-tours-wrapper-inner">
        <div className="hot-tours-carousel">
          <div className="hot-tours-carousel-inner-wrapper">
            <div className="hot-tours-carousel-inner">
              <div className="hot-tours-carousel-inner-items" ref={carouselRef}>
                {carouselTours.map((tour) => (
                  <HotToursItem tour={tour} key={`hot-tour-${tour._id}`} />
                ))}
              </div>
            </div>
          </div>
          <div className="hot-tours-carousel-buttons">
            <button
              className="hot-tours-carousel-buttons-next"
              onClick={() => slide(true)}
            >
              <img src={arrowRightIcon.src} alt="arrow-right-icon" />
            </button>
            <button
              className="hot-tours-carousel-buttons-prev"
              onClick={() => slide(false)}
            >
              <img src={arrowRightIcon.src} alt="arrow-left-icon" />
            </button>
          </div>
        </div>
        <div className="hot-tours-info">
          <div>
            <h2>
              {t('hot_tours_last')}
              <br />
              {t('hot_tours_min')}
            </h2>
            <p>{t('hot_tours_offer')}</p>
          </div>
          <h4>{t('hot_tours_text')}!</h4>
        </div>
      </div>
    </div>
  );
};

export default HotTours;
