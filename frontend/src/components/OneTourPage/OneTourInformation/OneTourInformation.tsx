import React from 'react';
import { Fade } from 'react-awesome-reveal';
import { selectOneTour } from '@/containers/tours/toursSlice';
import { apiUrl } from '@/constants';
import { useAppSelector } from '@/store/hooks';

const OneTourInformation = () => {
  const tour = useAppSelector(selectOneTour);

  const getSpan = (value: string) => <span>{value}</span>;

  if (!tour) return null;

  const duration = getSpan(
    `${tour.duration} Day${tour.duration > 1 ? 's' : ''}`,
  );

  return (
    <Fade>
      <div className="one-tour-inner">
        <h3 className="one-tour-inner-title">{tour.name}</h3>
        <div className="one-tour-inner-price-wrap">
          <span className="one-tour-inner-price">{tour.price} KGS</span>
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
                <td>Guides</td>
                <td>
                  {tour.guides.map((guide) => (
                    <div key={guide._id}>{guide.user.displayName}</div>
                  ))}
                </td>
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
    </Fade>
  );
};

export default OneTourInformation;
