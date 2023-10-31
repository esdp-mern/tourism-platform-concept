import React from "react";
import { Tour } from "../../type";
import { apiUrl } from "../../constants";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import "./TourItem.css";

interface Props {
  tour: Tour;
}

const TourItem: React.FC<Props> = ({ tour }) => {
  const imgLink = apiUrl + "/" + tour.image;
  const startDate = new Date(tour.startDate);
  const endDate = new Date(tour.endDate);

  const timeDifference = Number(endDate) - Number(startDate);
  const duration = timeDifference / (1000 * 60 * 60 * 24);

  return (
    <Fade>
      <div className="tour-item">
        <Link to={`/tours/${tour._id}`} className="tour-item-links">
          <div className="tour-item-top">
            <img src={imgLink} alt={tour.name} className="tour-item-img" />
            <div className="tour-item-price">{tour.price.toString()} KGS</div>
          </div>
        </Link>
        <div className="tour-item-bottom">
          <Link to={`/tours/${tour._id}`} className="tour-item-links">
            <h2 className="tour-item-title">{tour.name}</h2>
          </Link>
          <div className="tour-item-country">{tour.country}</div>
          <div className="tour-item-info">
            <div className="tour-item-duration">{duration} days</div>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default TourItem;
