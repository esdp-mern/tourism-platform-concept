import React from 'react';
import { TourFull } from '@/type';
import { apiUrl } from '@/constants';

interface Props {
  tour: TourFull | null;
  onOpenModal: (e: React.MouseEvent) => void;
}

const GalleryItem: React.FC<Props> = ({ tour, onOpenModal }) => {
  return (
    <>
      {tour?.galleryTour.map((img, index) => (
        <div key={index.toString()} className="one-tour-photo">
          <img
            className="gallery-imgs"
            src={apiUrl + '/' + img}
            alt={img}
            onClick={(e) => onOpenModal(e)}
          />
        </div>
      ))}
    </>
  );
};

export default GalleryItem;
