import React, { useEffect, useRef, useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import Number from '@/components/Statistics/Number';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectAdminStats,
  selectStatsInfo,
} from '@/containers/statistics/statisticsSlice';
import {
  fetchStatisticsInfo,
  fetchStatsAdmin,
} from '@/containers/statistics/statisticsThunk';

const Statistics = () => {
  const targetElementRef = useRef<HTMLDivElement>(null);
  const [isStatisticsVisible, setStatisticsVisible] = useState(false);
  const dispatch = useAppDispatch();
  const stats = useAppSelector(selectAdminStats);
  const statsInfo = useAppSelector(selectStatsInfo);

  useEffect(() => {
    dispatch(fetchStatsAdmin());
    dispatch(fetchStatisticsInfo());
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
  }, [isStatisticsVisible, dispatch]);

  return (
    <div className="statistics-main">
      <div className="container">
        <div className="statistics">
          <div className="statistics-info">
            <div className="statistics-info-left">
              <h2 className="statistics-title">{statsInfo?.title}</h2>
              <div className="statistics-txt" ref={targetElementRef}>
                <p>{statsInfo?.text1}</p>
                <p>{statsInfo?.text2}</p>
              </div>
            </div>
          </div>
          <Fade>
            <div className="statistics-num">
              <div className="statistics-num-card">
                <h3>
                  {isStatisticsVisible && (
                    <Number value={stats!.guidesPublished} duration={1500} />
                  )}
                  +
                </h3>
                <div className="statistics-num-txt">Guides</div>
              </div>
              <div className="statistics-num-card">
                <h3>
                  {isStatisticsVisible && (
                    <Number value={stats!.ordersAll} duration={1500} />
                  )}
                </h3>
                <div className="statistics-num-txt">Booked tours</div>
              </div>
              <div className="statistics-num-card">
                <h3>
                  {isStatisticsVisible && (
                    <Number value={stats!.toursAll} duration={1500} />
                  )}
                </h3>
                <div className="statistics-num-txt">Tours</div>
              </div>
              <div className="statistics-num-card">
                <h3>
                  {isStatisticsVisible && (
                    <Number value={stats!.platFormReviews} duration={1500} />
                  )}
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
