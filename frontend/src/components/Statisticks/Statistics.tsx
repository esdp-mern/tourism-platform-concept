import React, { useState, useEffect, useRef } from 'react';
import { Fade } from 'react-awesome-reveal';

const Statistics = () => {
  const [bookedTours, setBookedTours] = useState(80);
  const [visitors, setVisitors] = useState(400);
  const [reviews, setReviews] = useState(0);
  const [tours, setTours] = useState(0);
  const targetElementRef = useRef<HTMLDivElement>(null);
  const [isStatisticsVisible, setStatisticsVisible] = useState(false);

  const timeout = (length: number) => {
    if (length < 50) {
      return 80;
    } else if (length > 300) {
      return 50;
    } else if (length > 500) {
      return 30;
    } else if (length > 700) {
      return 20;
    } else if (length > 900) {
      return 10;
    } else if (length > 50) {
      return 70;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (targetElementRef.current) {
        const element = targetElementRef.current;
        const elementPosition = element.getBoundingClientRect();
        const windowHeight =
          window.innerHeight || document.documentElement.clientHeight;

        const isVisible =
          elementPosition.top < windowHeight && elementPosition.bottom >= 0;
        setStatisticsVisible(isVisible);
      }
    };

    if (isStatisticsVisible) {
      bookedTours !== 109 &&
        setTimeout(setBookedTours, timeout(90), bookedTours + 1);
      visitors !== 468 && setTimeout(setVisitors, timeout(468), visitors + 1);
      reviews !== 70 && setTimeout(setReviews, timeout(70), reviews + 1);
      tours !== 30 && setTimeout(setTours, timeout(30), tours + 1);
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isStatisticsVisible, bookedTours, visitors, reviews, tours]);
  return (
    <div className="statisticks-main" ref={targetElementRef}>
      <div className="container">
        <div className="statisticks">
          <div className="statisticks-info">
            <div className="statisticks-info-left">
              <h2 className="statisticks-title">
                Fastest Way to Book over 50 Great Tours
              </h2>
              <div className="statisticks-txt">
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
                <h3>{tours}+</h3>
                <div className="statisticks-num-txt">
                  Tours around Central Asia
                </div>
              </div>
              <div className="statisticks-num-card">
                <h3>{bookedTours}</h3>
                <div className="statisticks-num-txt">Booked tours</div>
              </div>
              <div className="statisticks-num-card">
                <h3>{visitors}</h3>
                <div className="statisticks-num-txt">Site visitors</div>
              </div>
              <div className="statisticks-num-card">
                <h3>{reviews}</h3>
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
