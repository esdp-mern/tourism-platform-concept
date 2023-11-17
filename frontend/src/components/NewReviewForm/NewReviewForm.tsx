import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import { useParams } from 'next/navigation';
import { IPostReview } from '@/type';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectUser } from '@/containers/users/usersSlice';
import { postReview } from '@/containers/tours/toursThunk';

const NewReviewForm = () => {
  const { id } = useParams() as {
    id: string;
  };
  const [state, setState] = useState<IPostReview>({
    user: '',
    tour: '',
    guide: null,
    comment: '',
    rating: 5,
  });
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const onRatingClick = (number: number) => {
    setState((prevState) => ({
      ...prevState,
      rating: number,
    }));
  };

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (!user) return;
      await dispatch(
        postReview({
          ...state,
          user: user._id,
          tour: id,
        }),
      ).unwrap();
      // dispatch(addAlert({ message: 'Your review is sent!', type: 'info' }));
      setState({
        user: '',
        tour: '',
        guide: null,
        comment: '',
        rating: 5,
      });
    } catch {
      // nothing
    }
  };

  return (
    <Fade>
      <h3 className="review-form-title">Write a review</h3>
      <form className="review-form" onSubmit={onSubmit}>
        <div className="tour-rating-range">
          <span>Rating</span>
          <div className="tour-rating-stars">
            <span
              className={`star-icon ${state.rating >= 1 && 'rated-star'}`}
              onClick={() => onRatingClick(1)}
            >
              &#9733;
            </span>
            <span
              className={`star-icon ${state.rating >= 2 && 'rated-star'}`}
              onClick={() => onRatingClick(2)}
            >
              &#9733;
            </span>
            <span
              className={`star-icon ${state.rating >= 3 && 'rated-star'}`}
              onClick={() => onRatingClick(3)}
            >
              &#9733;
            </span>
            <span
              className={`star-icon ${state.rating >= 4 && 'rated-star'}`}
              onClick={() => onRatingClick(4)}
            >
              &#9733;
            </span>
            <span
              className={`star-icon ${state.rating >= 5 && 'rated-star'}`}
              onClick={() => onRatingClick(5)}
            >
              &#9733;
            </span>
          </div>
        </div>
        <div className="review-form-textarea">
          <textarea
            className="review-form-input"
            placeholder="comment"
            onChange={onChange}
            value={state.comment}
            name="comment"
            required
          />
        </div>
        <button type="submit">send</button>
      </form>
    </Fade>
  );
};

export default NewReviewForm;
