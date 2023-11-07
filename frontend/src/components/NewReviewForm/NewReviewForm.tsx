import React, { ChangeEvent, FormEvent, useState } from 'react';
import './newReviewForm.css';
import { Fade } from 'react-awesome-reveal';

const NewReviewForm = () => {
  const [state, setState] = useState({
    user: '',
    tour: '',
    guide: '',
    comment: '',
    rating: 5,
    date: '',
  });

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
        <div className="review-form-inputs">
          <div className="reviewer-name">
            <input
              type="text"
              className="review-form-input"
              placeholder="name"
              onChange={onChange}
              value={state.comment}
              name="comment"
            />
          </div>
          <div className="reviewer-email">
            <input
              type="email"
              className="review-form-input"
              placeholder="email"
              onChange={onChange}
              value={state.comment}
              name="comment"
            />
          </div>
        </div>
        <div className="review-form-textarea">
          <textarea
            className="review-form-input"
            placeholder="comment"
            onChange={onChange}
            value={state.comment}
            name="comment"
          />
        </div>
        <button type="submit">send</button>
      </form>
    </Fade>
  );
};

export default NewReviewForm;
