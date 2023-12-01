import React, { useEffect, useState } from 'react';
import { ReviewOfPlatform } from '@/type';

interface Props {
  reviews: ReviewOfPlatform[];
}

const ReviewsMain: React.FC<Props> = ({ reviews }) => {
  const [currentReview, setCurrentReview] = useState<ReviewOfPlatform | null>(
    null,
  );
  const [currentWidth, setCurrentWidth] = useState(0);

  useEffect(() => {
    setCurrentWidth(window.innerWidth);
    window.addEventListener('resize', () => setCurrentWidth(window.innerWidth));

    setCurrentReview(reviews[0]);
  }, [reviews]);

  return (
    <div className="reviews-main-page">
      <div className="container reviews-main-page-inner">
        <div className="reviews-main-page-content">
          <h2 className="reviews-main-page-title">What Our Clients Say</h2>
          <div className="reviews-main-page-info">
            <div className="reviews-main-page-txt">
              {currentReview?.comment}
            </div>
            <div className="reviews-main-page-author">
              {currentReview?.user.displayName}
            </div>
          </div>
        </div>
        <div className="reviews-main-page-imgs">
          {currentWidth > 1020 && <div></div>}
          <div>
            <img
              src="https://livedemo00.template-help.com/wt_prod-19282/images/home-1-4-94x94.jpg"
              alt="user-1"
              className="reviews-main-page-img"
              onClick={() => setCurrentReview(reviews[0])}
            />
          </div>
          <div>
            <img
              src="https://livedemo00.template-help.com/wt_prod-19282/images/home-1-5-94x94.jpg"
              alt="user-1"
              className="reviews-main-page-img"
              onClick={() => {
                if (reviews[1]) {
                  setCurrentReview(reviews[1]);
                  return;
                }
                setCurrentReview(reviews[0]);
              }}
            />
          </div>
          <div>
            <img
              src="	https://livedemo00.template-help.com/wt_prod-19282/images/home-1-6-94x94.jpg"
              alt="user-1"
              className="reviews-main-page-img"
              onClick={() => {
                if (reviews[2]) {
                  setCurrentReview(reviews[2]);
                  return;
                }
                setCurrentReview(reviews[0]);
              }}
            />
          </div>
          <div>
            <img
              src="https://livedemo00.template-help.com/wt_prod-19282/images/home-1-7-94x94.jpg"
              alt="user-1"
              className="reviews-main-page-img"
              onClick={() => {
                if (reviews[3]) {
                  setCurrentReview(reviews[3]);
                  return;
                }
                setCurrentReview(reviews[0]);
              }}
            />
          </div>
          <div>
            <img
              src="https://livedemo00.template-help.com/wt_prod-19282/images/home-1-8-94x94.jpg"
              alt="user-1"
              className="reviews-main-page-img"
              onClick={() => {
                if (reviews[4]) {
                  setCurrentReview(reviews[4]);
                  return;
                }
                setCurrentReview(reviews[0]);
              }}
            />
          </div>
          {currentWidth > 1020 && <div></div>}
          <div>
            <img
              src="https://livedemo00.template-help.com/wt_prod-19282/images/home-1-9-94x94.jpg"
              alt="user-1"
              className="reviews-main-page-img"
              onClick={() => {
                if (reviews[5]) {
                  setCurrentReview(reviews[5]);
                  return;
                }
                setCurrentReview(reviews[0]);
              }}
            />
          </div>
          {currentWidth > 1020 && <div></div>}
        </div>
      </div>
    </div>
  );
};

export default ReviewsMain;
