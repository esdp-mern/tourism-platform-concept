import React from 'react';
import { Fade } from 'react-awesome-reveal';
import dayjs from 'dayjs';
import { useAppSelector } from '@/store/hooks';
import { selectToursReviews } from '@/containers/reviews/reviewSlice';
import NewReviewForm from '@/components/NewReviewForm/NewReviewForm';
import { selectUser } from '@/containers/users/usersSlice';
import { selectToursRating } from '@/containers/ratings/ratingSlice';

const OneTourReview = () => {
  const toursReviews = useAppSelector(selectToursReviews);
  const user = useAppSelector(selectUser);
  const toursRatings = useAppSelector(selectToursRating);
  let reviewTotal = '';

  const calculateAverageRating = () => {
    if (toursReviews.length === 0) {
      return 0;
    }

    const sum = toursRatings.reduce(
      (total, rating) => total + rating.rating,
      0,
    );

    if (sum / toursRatings.length === 5) {
      reviewTotal = 'Super';
    } else if (sum / toursRatings.length >= 4) {
      reviewTotal = 'Good';
    } else if (sum / toursRatings.length >= 3) {
      reviewTotal = 'Normal';
    } else if (sum / toursRatings.length >= 2) {
      reviewTotal = 'Bad';
    } else if (sum / toursRatings.length >= 1) {
      reviewTotal = 'Very bad';
    } else {
      reviewTotal = 'Not rated';
    }
    return sum / toursRatings.length;
  };

  const calculatePercentageOfMax = (value: number, max: number): number => {
    if (max === 0) {
      return 0;
    }

    const percentage = (value / max) * 100;
    return parseFloat(percentage.toFixed(2));
  };

  let percentage = calculatePercentageOfMax(calculateAverageRating(), 5);
  if (toursRatings.length === 0) {
    percentage = 0;
  }

  return (
    <div className="one-tour-reviews">
      <div className="one-tour-reviews-inner">
        <Fade>
          <div className="one-tour-average-wrap">
            <div className="one-tour-average-num">
              <h5>
                {toursRatings.length > 0
                  ? calculateAverageRating().toFixed(1)
                  : 0}
              </h5>
              <p>{reviewTotal}</p>
            </div>
            <div className="one-tour-average-progress">
              <div
                className="one-tour-average-filler"
                style={{
                  width: `${percentage}%`,
                }}
              ></div>
            </div>
          </div>
          <div className="one-tour-review-wrap">
            {toursReviews.map((review, index) => (
              <div className="one-tour-review" key={index}>
                <h3>{review.user.displayName}</h3>
                <div className="one-tour-review-date">
                  {dayjs(review.date).format('DD.MM.YYYY')}
                </div>
                <div className="one-tour-review-comment">{review.comment}</div>
              </div>
            ))}
          </div>
        </Fade>
        <div>{user && <NewReviewForm />}</div>
      </div>
    </div>
  );
};

export default OneTourReview;
