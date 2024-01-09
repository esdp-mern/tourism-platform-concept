import React, { useEffect, useRef, useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import Number from '@/components/Statistics/Number';
import magnifierIcon from '@/assets/images/magnifier.svg';
import Image from 'next/image';

const Statistics = () => {
  const targetElementRef = useRef<HTMLDivElement>(null);
  const [isStatisticsVisible, setStatisticsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (targetElementRef.current) {
        const element = targetElementRef.current;
        const elementPosition = element.getBoundingClientRect();
        const windowHeight =
          window.innerHeight || document.documentElement.clientHeight;

        const isVisible =
          elementPosition.top < windowHeight && elementPosition.bottom >= -250;
        setStatisticsVisible(isVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isStatisticsVisible]);

  return (
    <div className="statistics-main">
      <div className="container">
        <div className="statistics">
          <div className="statistics-info">
            <div className="statistics-info-left">
              <h2 className="statistics-title">
                Fastest Way to Book over 50 Great Tours
              </h2>
              <div className="statistics-txt" ref={targetElementRef}>
                <p>
                  Sunway provides a variety of great tours to travelers and
                  customers throughout the world. We offer top deals at
                  affordable prices!
                </p>
                <p>
                  Our tour agency is the leading provider of cheap air tickets
                  as well as amazing offers for tourists and people who like to
                  explore the untraveled world paths. We can create the most
                  unforgettable holiday for you, your family, and friends!
                </p>
              </div>
            </div>
          </div>
          <Fade>
            <div className="statistics-num">
              <div className="statistics-num-card">
                <h3>
                  {isStatisticsVisible && <Number value={30} duration={1500} />}
                  +
                </h3>
                <div className="statistics-num-txt">
                  Tours around Central Asia
                </div>
              </div>
              <div className="statistics-num-card">
                <h3>
                  {isStatisticsVisible && (
                    <Number value={109} duration={1500} />
                  )}
                </h3>
                <div className="statistics-num-txt">Booked tours</div>
              </div>
              <div className="statistics-num-card">
                <h3>
                  {isStatisticsVisible && (
                    <Number value={468} duration={1500} />
                  )}
                </h3>
                <div className="statistics-num-txt">Site visitors</div>
              </div>
              <div className="statistics-num-card">
                <h3>
                  {isStatisticsVisible && <Number value={70} duration={1500} />}
                </h3>
                <div className="statistics-num-txt">Reviews</div>
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
