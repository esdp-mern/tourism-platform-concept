import React, { useEffect, useRef, useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import Number from '@/components/Statisticks/Number';

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
    <div className="statisticks-main">
      <div className="container">
        <div className="statisticks">
          <div className="statisticks-info">
            <div className="statisticks-info-left">
              <h2 className="statisticks-title">
                Fastest Way to Book over 50 Great Tours
              </h2>
              <div className="statisticks-txt" ref={targetElementRef}>
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
            <div className="statisticks-info-right">
              <button className="statisticks-btn">Search</button>
            </div>
          </div>
          <Fade>
            <div className="statisticks-num">
              <div className="statisticks-num-card">
                <h3>
                  {isStatisticsVisible && <Number value={30} duration={1500} />}
                  +
                </h3>
                <div className="statisticks-num-txt">
                  Tours around Central Asia
                </div>
              </div>
              <div className="statisticks-num-card">
                <h3>
                  {isStatisticsVisible && (
                    <Number value={109} duration={1500} />
                  )}
                </h3>
                <div className="statisticks-num-txt">Booked tours</div>
              </div>
              <div className="statisticks-num-card">
                <h3>
                  {isStatisticsVisible && (
                    <Number value={468} duration={1500} />
                  )}
                </h3>
                <div className="statisticks-num-txt">Site visitors</div>
              </div>
              <div className="statisticks-num-card">
                <h3>
                  {isStatisticsVisible && <Number value={70} duration={1500} />}
                </h3>
                <div className="statisticks-num-txt">Reviews</div>
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
