import React, { useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { selectOneTour } from '@/containers/tours/toursSlice';
import { apiUrl } from '@/constants';

const Gallery = () => {
  const tour = useAppSelector(selectOneTour);
  const [modal, showModal] = useState(false);
  const [currentImg, setCurrentImg] = useState('');

  const onOpenModal = (e: React.MouseEvent) => {
    const src = e.currentTarget.getAttribute('src')!;
    setCurrentImg(src);
    showModal(true);
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
      <div className="one-tour-gallery">
        <h2>Tour Gallery</h2>
        <div className="one-tour-photos">
          {tour?.galleryTour.map((img, index) => (
            <div key={index.toString()} className="one-tour-photo">
              <img
                src={apiUrl + '/' + img}
                alt={img}
                onClick={(e) => onOpenModal(e)}
              />
            </div>
          ))}
        </div>
      </div>
      {modal ? (
        <div
          className={`backdrop-gallery ${
            currentImg && currentImg.length !== 0 ? 'backdrop-gallery-open' : ''
          }`}
          onClick={() => showModal(false)}
        >
          <div className="backdrop-gallery-btn">X</div>
          <div className="backdrop-gallery-mainImg">
            {tour && tour?.galleryTour.length > 1 ? (
              <div
                className="backdrop-gallery-icons backdrop-gallery-icon-left"
                onClick={(e) => onLeftClick(e)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="backdrop-gallery-icon-svg"
                >
                  <path d="m12.718 4.707-1.413-1.415L2.585 12l8.72 8.707 1.413-1.415L6.417 13H20v-2H6.416l6.302-6.293z" />
                </svg>
              </div>
            ) : null}
            <img
              src={currentImg}
              alt={currentImg}
              className="modal-img"
              onClick={(e) => e.stopPropagation()}
            />
            {tour && tour?.galleryTour.length > 1 ? (
              <div
                className="backdrop-gallery-icons backdrop-gallery-icon-right"
                onClick={(e) => onRightClick(e)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="backdrop-gallery-icon-svg"
                >
                  <path d="M11.293 4.707 17.586 11H4v2h13.586l-6.293 6.293 1.414 1.414L21.414 12l-8.707-8.707-1.414 1.414z" />
                </svg>
              </div>
            ) : null}
          </div>
          <div className="backdrop-gallery-inner">
            {tour && tour?.galleryTour.length > 1
              ? tour?.galleryTour.map((img, index) => (
                  <img
                    className={
                      currentImg === apiUrl + '/' + img
                        ? 'backdrop-gallery-img-current'
                        : ''
                    }
                    src={apiUrl + '/' + img}
                    alt={img}
                    key={index}
                    onClick={(e) => onGalleryImgsClick(e)}
                  />
                ))
              : null}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Gallery;
