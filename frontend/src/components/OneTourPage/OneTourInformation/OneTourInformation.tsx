import React, { useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import {
  galleryModal,
  selectOneTour,
  showModal,
} from '@/containers/tours/toursSlice';
import { apiUrl } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import GalleryItem from '@/components/OneTourPage/Gallery/GalleryItem';
import GalleryModal from '@/components/OneTourPage/Gallery/GalleryModal';

const OneTourInformation = () => {
  const tour = useAppSelector(selectOneTour);
  const modal = useAppSelector(galleryModal);
  const dispatch = useAppDispatch();
  const [currentImg, setCurrentImg] = useState('');

  const getSpan = (value: string) => <span>{value}</span>;

  if (!tour) return null;

  const duration = getSpan(
    `${tour.duration} Day${tour.duration > 1 ? 's' : ''}`,
  );

  const onOpenModal = (e: React.MouseEvent) => {
    const src = e.currentTarget.getAttribute('src')!;
    setCurrentImg(src);
    dispatch(showModal(true));
  };

  const onGalleryImgsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const src = e.currentTarget.getAttribute('src')!;
    setCurrentImg(src);
  };
  const onLeftClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    const src = e.currentTarget.getAttribute('src')!;
    setCurrentImg(src);
    let index = 0;

    tour?.galleryTour.forEach((t, i) => {
      if (currentImg === apiUrl + '/' + t) {
        index = i - 1;
      }
    });

    if (index >= 0) {
      setCurrentImg(apiUrl + '/' + tour?.galleryTour[index]);
    } else {
      setCurrentImg(currentImg);
    }
  };

  const onRightClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    const src = e.currentTarget.getAttribute('src')!;
    setCurrentImg(src);
    let index = 0;

    tour?.galleryTour.forEach((t, i) => {
      if (currentImg === apiUrl + '/' + t) {
        index = i + 1;
      }
    });

    if (index >= 0 && index < tour?.galleryTour.length!) {
      setCurrentImg(apiUrl + '/' + tour?.galleryTour[index]);
    } else {
      setCurrentImg(currentImg);
    }
  };

  return (
    <>
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
                  <td>Country</td>
                  <td>{tour.country}</td>
                </tr>
                <tr>
                  <td>Destination</td>
                  <td>{tour.destination}</td>
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
                  <td>Dress-code</td>
                  <td>{tour.dressCode}</td>
                </tr>
                <tr>
                  <td>Guides</td>
                  <td>
                    {tour.guides.length > 0 ? (
                      tour.guides.map((guide) => (
                        <div key={guide._id}>{guide.user.displayName}</div>
                      ))
                    ) : (
                      <div>No guide for this tour</div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Category</td>
                  <td>{tour.category.join(', ')}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="one-tour-inner-gallery">
            <h3>Tour Gallery</h3>
            <div className="one-tour-inner-gallery2">
              <GalleryItem tour={tour} onOpenModal={onOpenModal} />
            </div>
          </div>
        </div>
      </Fade>
      {modal ? (
        <GalleryModal
          tour={tour}
          currentImg={currentImg}
          onLeftClick={onLeftClick}
          onRightClick={onRightClick}
          onGalleryImgsClick={onGalleryImgsClick}
        />
      ) : null}
    </>
  );
};

export default OneTourInformation;
