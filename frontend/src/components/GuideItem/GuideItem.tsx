import React from 'react';
import Link from 'next/link';

interface Props {
  id: string;
  name: string;
  role: string;
  description: string;
  imageUrl: string;
}

const GuideItem: React.FC<Props> = ({
  id,
  name,
  role,
  description,
  imageUrl,
}) => {
  return (
    <div className="guide-card">
      <img
        src={imageUrl}
        alt={`${name} - ${role}`}
        className="guide-card__image"
      />
      <div className="guide-card__content">
        <h2 className="guide-card__name">{name}</h2>
        <p className="guide-card__role">{role}</p>
        <p className="guide-card__description">{description}</p>
        <Link href={`/team/${id}`} className="guide-card__link">
          View More
        </Link>
      </div>
    </div>
  );
};

export default GuideItem;
