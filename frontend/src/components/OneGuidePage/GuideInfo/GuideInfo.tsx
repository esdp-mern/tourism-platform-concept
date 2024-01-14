import React from 'react';
import { Fade } from 'react-awesome-reveal';
import { useAppSelector } from '@/store/hooks';
import { selectOneGuide } from '@/containers/guides/guidesSlice';
import { apiUrl } from '@/constants';
import { selectGuideTours } from '@/containers/tours/toursSlice';
import TourListItem from '@/components/TourListItem/TourListItem';
import Image from 'next/image';

const GuideInfo = () => {
  const guide = useAppSelector(selectOneGuide);
  const tours = useAppSelector(selectGuideTours);

  if (!guide || !tours.length) return null;

  return (
    <Fade>
      <div className="guide-page_guide-info">
        <div className="guide-page_info-title-wrap">
          <div className="guide-page_avatar-wrap">
            <Image
              width={145}
              height={145}
              className="guide-page_avatar"
              src={apiUrl + '/' + guide.user.avatar}
              alt={guide.user.displayName}
            />
          </div>
          <div>
            <h1 className="guide-page_info-title">{guide.user.displayName}</h1>
          </div>
        </div>
        <div>
          <p>{guide.description}</p>
        </div>
        <div>
          <table className="guide-page_table">
            <tbody>
              <tr>
                <td>Country :</td>
                <td>{guide.country}</td>
              </tr>
              <tr>
                <td>Languages :</td>
                <td>
                  {guide.languages.map((lang) => (
                    <span key={lang}>{lang} </span>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="guide-page_tours">
          <h4 className="guide-page_tours-title">Tours :</h4>
          <div className="guide-page_tours-wrap">
            {tours.map((tour) => (
              <TourListItem tour={tour} key={tour._id} />
            ))}
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default GuideInfo;
