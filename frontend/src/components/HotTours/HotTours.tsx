import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { selectAllTours } from '@/containers/tours/toursSlice';
import HotToursItem from '@/components/HotTours/components/HotToursItem/HotToursItem';
import arrowRightIcon from '@/assets/images/arrow-right.svg';
import { Tour } from '@/type';

const x = 445;

const HotTours = () => {
  const tours = useAppSelector(selectAllTours);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [carouselTours, setCarouselTours] = useState<Tour[]>(
    tours.length ? [tours[0], tours[1], tours[2], tours[3]] : [],
  );

  const slide = useCallback(
    (isNext: boolean) => {
      if (!carouselRef.current || !carouselTours.length) return;

      const ms = 250;

      carouselRef.current.style.cssText = `
  transition: all ${ms}ms ease 0s;
  transform: translateX(${isNext ? '-' : ''}${x}px);
`;

      setTimeout(() => {
        carouselRef.current!.style.cssText = `
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
