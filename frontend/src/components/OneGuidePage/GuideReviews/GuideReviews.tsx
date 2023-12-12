import React from 'react';
import { useAppSelector } from '@/store/hooks';
import { selectGuidesReviews } from '@/containers/reviews/reviewSlice';
import { Fade } from 'react-awesome-reveal';
import { selectUser } from '@/containers/users/usersSlice';
import { selectGuidRating } from '@/containers/ratings/ratingSlice';
import OneReview from '@/components/OneReview/OneReview';
import NewReview from '@/components/Forms/newReview/NewReview';

const GuideReviews = () => {
  const reviews = useAppSelector(selectGuidesReviews);
  const rating = useAppSelector(selectGuidRating);
  const user = useAppSelector(selectUser);

  return (
    <div className="one-guide_reviews">
      <div className="one-guide_reviews-inner">
        <Fade>
          <div className="one-guide_average-wrap"></div>
          <div className="one-guide_review-wrap">
            {reviews.map((review, index) => (
              <OneReview review={review} key={review._id} />
            ))}
          </div>
        </Fade>
        <div>{user && <NewReview guideReview={true} />}</div>
      </div>
    </div>
  );
};

export default GuideReviews;
