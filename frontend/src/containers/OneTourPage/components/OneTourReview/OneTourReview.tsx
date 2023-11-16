import React, { useEffect } from 'react';
import { Fade } from 'react-awesome-reveal';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectToursReviews } from '@/containers/reviews/reviewSlice';
import { fetchToursReviews } from '@/containers/reviews/reviewThunk';
import NewReviewForm from '@/components/NewReviewForm/NewReviewForm';

interface Props {
  id: string;
}

const OneTourReview: React.FC<Props> = ({ id }) => {
  const toursReviews = useAppSelector(selectToursReviews);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchToursReviews(id));
    }
  }, [id, dispatch]);

  let reviewTotal = '';

  const calculateAverageRating = () => {
    if (toursReviews.length === 0) {
      return 0;
    }

    const sum = toursReviews.reduce(
      (total, rating) => total + rating.rating,
      0,
    );
    if (sum / toursReviews.length === 5) {
      reviewTotal = 'Super';
    } else if (sum / toursReviews.length === 4) {
      reviewTotal = 'Good';
    } else if (sum / toursReviews.length === 3) {
      reviewTotal = 'Normal';
    } else if (sum / toursReviews.length === 2) {
      reviewTotal = 'Bad';
    } else {
      reviewTotal = 'Not rated';
    }
    return sum / toursReviews.length;
  };

  const calculatePercentageOfMax = (value: number, max: number): number => {
    if (max === 0) {
      return 0;
    }

    const percentage = (value / max) * 100;
    return parseFloat(percentage.toFixed(2));
  };

  const percentage = calculatePercentageOfMax(calculateAverageRating(), 5);

  return (
    <div className="one-tour-reviews">
      <div className="one-tour-reviews-inner">
        <Fade>
          <div className="one-tour-average-wrap">
            <div className="one-tour-average-num">
              <p>{calculateAverageRating().toFixed(1)}</p>
              <h5>{reviewTotal}</h5>
            </div>
            <div className="one-tour-average-progress">
              <div
                className="one-tour-average-filler"
                style={{
                  width: `${percentage}%`,
                }}
              >
                {percentage} %
              </div>
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
        <div>
          <NewReviewForm />
        </div>
      </div>
    </div>
  );
};

export default OneTourReview;
