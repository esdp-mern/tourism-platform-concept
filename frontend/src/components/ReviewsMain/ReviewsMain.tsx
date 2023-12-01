import React from 'react';
import { ReviewOfPlatform } from '@/type';

interface Props {
  reviews: ReviewOfPlatform[];
}

const ReviewsMain: React.FC<Props> = ({ reviews }) => {
  const last = reviews[reviews.length - 1];

  return (
    <div className="container">
      <div className="reviews-main-page">
        <div>
          <h2 className="reviews-main-page-title">What Our Clients Say</h2>
          <div className="reviews-main-page-info">
            <div className="reviews-main-page-txt">{last?.comment}</div>
            <div className="reviews-main-page-author">
              {last?.user.displayName}
            </div>
          </div>
        </div>
        <div className="reviews-main-page-imgs">
          <div></div>
          <div>
            <img
              src="https://livedemo00.template-help.com/wt_prod-19282/images/home-1-4-94x94.jpg"
              alt="user-1"
              className="reviews-main-page-img"
            />
          </div>
          <div>
            <img
              src="https://livedemo00.template-help.com/wt_prod-19282/images/home-1-5-94x94.jpg"
              alt="user-1"
              className="reviews-main-page-img"
            />
          </div>
          <div>
            <img
              src="	https://livedemo00.template-help.com/wt_prod-19282/images/home-1-6-94x94.jpg"
              alt="user-1"
              className="reviews-main-page-img"
            />
          </div>
          <div>
            <img
              src="https://livedemo00.template-help.com/wt_prod-19282/images/home-1-7-94x94.jpg"
              alt="user-1"
              className="reviews-main-page-img"
            />
          </div>
          <div>
            <img
              src="https://livedemo00.template-help.com/wt_prod-19282/images/home-1-8-94x94.jpg"
              alt="user-1"
              className="reviews-main-page-img"
            />
          </div>
          <div></div>
          <div>
            <img
              src="https://livedemo00.template-help.com/wt_prod-19282/images/home-1-9-94x94.jpg"
              alt="user-1"
              className="reviews-main-page-img"
            />
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsMain;
