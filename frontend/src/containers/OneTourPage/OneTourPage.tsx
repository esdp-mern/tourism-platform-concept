import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { fetchTour } from '../../store/toursThunk';
import { selectOneTour } from '../../store/toursSlice';
import './OneTourPage.css';
import { apiUrl } from '../../constants';
import { Fade } from 'react-awesome-reveal';

const OneTourPage = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const tour = useAppSelector(selectOneTour);
  const [btnInfo, setBtnInfo] = useState(true);
  const [btnPlan, setBtnPlan] = useState(false);
  const [btnLocation, setBtnLocation] = useState(false);
  const [btnReview, setBtnReview] = useState(false);
  const [btnGallery, setBtnGallery] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchTour(id));
    }
  }, [id, dispatch]);
  const imgLink = apiUrl + '/' + tour?.mainImage;

  const onBtnInfoClick = () => {
    setBtnInfo(true);
    setBtnPlan(false);
    setBtnReview(false);
    setBtnLocation(false);
    setBtnGallery(false);
  };

  const onBtnPlanClick = () => {
    setBtnInfo(false);
    setBtnPlan(true);
    setBtnReview(false);
    setBtnLocation(false);
    setBtnGallery(false);
  };

  const onBtnLocationClick = () => {
    setBtnInfo(false);
    setBtnPlan(false);
    setBtnReview(false);
    setBtnLocation(true);
    setBtnGallery(false);
  };

  const onBtnReviewClick = () => {
    setBtnInfo(false);
    setBtnPlan(false);
    setBtnReview(true);
    setBtnLocation(false);
    setBtnGallery(false);
  };

  const onBtnGalleryClick = () => {
    setBtnInfo(false);
    setBtnPlan(false);
    setBtnReview(false);
    setBtnLocation(false);
    setBtnGallery(true);
  };

  let duration = <></>;

  if (tour) {
    if (tour.duration === 1) {
      duration = <span>{tour.duration} Day</span>;
    } else {
      duration = <span>{tour.duration} Days</span>;
    }
  }

  return (
    <>
      {tour ? (
        <div className="one-tour">
          <div className="one-tour-top">
            <img src={imgLink} className="one-tour-img" alt={tour.name} />
            <div className="one-tour-top-info">
              <div className="one-tour-top-line"></div>
              <h2 className="one-tour-top-title">{tour?.name}</h2>
              <div className="one-tour-btns">
                <button className="one-tour-btn-one">Video Preview</button>
                <button className="one-tour-btn-two">View photos</button>
              </div>
            </div>
            <div className="one-tour-slider-btns">
              <button onClick={onBtnInfoClick} className="one-tour-slider-info">
                Information
              </button>
              <button onClick={onBtnPlanClick} className="one-tour-slider-plan">
                Tour plan
              </button>
              <button
                onClick={onBtnLocationClick}
                className="one-tour-slider-location"
              >
                Location
              </button>
              <button
                onClick={onBtnGalleryClick}
                className="one-tour-slider-gallery"
              >
                Gallery
              </button>
              <button
                onClick={onBtnReviewClick}
                className="one-tour-slider-reviews"
              >
                Reviews
              </button>
            </div>
          </div>
          <div className="container">
            {btnInfo ? (
              <Fade>
                <div>
                  <div className="one-tour-inner">
                    <h3 className="one-tour-inner-title">{tour.name}</h3>
                    <div className="one-tour-inner-price-wrap">
                      <span className="one-tour-inner-price">
                        {String(tour.price)} KGS
                      </span>
                      per person
                    </div>
                    <div className="one-tour-inner-info">
                      <div className="one-tour-inner-duration">{duration}</div>
                      <div className="one-tour-inner-featur">Featured Tour</div>
                    </div>
                    <div className="one-tour-inner-txt">{tour.description}</div>
                    <div className="one-tour-inner-box">
                      <table className="one-tour-inner-table">
                        <tbody>
                          <tr>
                            <td>Destination</td>
                            <td>{tour.country}</td>
                          </tr>
                          <tr>
                            <td>Arrival</td>
                            <td>{tour.arrival}</td>
                          </tr>
                          <tr>
                            <td>Departure</td>
                            <td>{tour.departure}</td>
                          </tr>
                          <tr>
                            <td>What is Included</td>
                            <td>
                              <ul className="one-tour-inner-table-list">
                                {tour.included.map((inc, id) => (
                                  <li key={id}>{inc}</li>
                                ))}
                              </ul>
                            </td>
                          </tr>
                          <tr>
                            <td>Departure</td>
                            <td>{tour.dressCode}</td>
                          </tr>
                          <tr>
                            <td>Guide</td>
                            <td>{tour.guide}</td>
                          </tr>
                          <tr>
                            <td>Category</td>
                            {tour.category.map((cat, id) => (
                              <td key={id}>{cat}</td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="one-tour-inner-gallery">
                      <h3>Tour Gallery</h3>
                      <div className="one-tour-inner-gallery2">
                        {tour.galleryTour.map((photo, id) => (
                          <div key={id}>
                            <img
                              alt="photo"
                              src={apiUrl + '/' + photo}
                              className="one-tour-inner-photo"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Fade>
            ) : null}
            {btnPlan ? <div>Tour plan</div> : null}
            {btnLocation ? <div>Tour location</div> : null}
            {btnReview ? <div>Tour review</div> : null}
            {btnGallery ? <div>Tour gallery</div> : null}
          </div>
        </div>
      ) : (
        <div>No such tour!</div>
      )}
    </>
  );
};

export default OneTourPage;
