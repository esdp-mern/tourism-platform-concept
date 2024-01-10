import React, { useEffect, useRef, useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import Number from '@/components/Statistics/Number';
import magnifierIcon from '@/assets/images/magnifier.svg';
import { T } from '@/store/translation';

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
                {T('/main', 'statistics_title')}
              </h2>
              <div className="statistics-txt" ref={targetElementRef}>
                <p>{T('/main', 'statistics_text')}</p>
              </div>
            </div>
            <button className="statistics-btn">
              <img src={magnifierIcon.src} alt="magnifier-icon" />
              {T('/main', 'statistics_btn')}
            </button>
          </div>
          <Fade>
            <div className="statistics-num">
              <div className="statistics-num-card">
                <h3>
                  {isStatisticsVisible && <Number value={30} duration={1500} />}
                  +
                </h3>
                <div className="statistics-num-txt">
                  {T('/main', 'statistics_one')}
                </div>
              </div>
              <div className="statistics-num-card">
                <h3>
                  {isStatisticsVisible && (
                    <Number value={109} duration={1500} />
                  )}
                </h3>
                <div className="statistics-num-txt">
                  {T('/main', 'statistics_two')}
                </div>
              </div>
              <div className="statistics-num-card">
                <h3>
                  {isStatisticsVisible && (
                    <Number value={468} duration={1500} />
                  )}
                </h3>
                <div className="statistics-num-txt">
                  {T('/main', 'statistics_three')}
                </div>
              </div>
              <div className="statistics-num-card">
                <h3>
                  {isStatisticsVisible && <Number value={70} duration={1500} />}
                </h3>
                <div className="statistics-num-txt">
                  {T('/main', 'statistics_four')}
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
