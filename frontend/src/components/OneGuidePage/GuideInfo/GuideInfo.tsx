import React from 'react';
import { Fade } from 'react-awesome-reveal';
import { useAppSelector } from '@/store/hooks';
import { selectOneGuide } from '@/containers/guides/guidesSlice';
import { apiUrl } from '@/constants';

const GuideInfo = () => {
  const guide = useAppSelector(selectOneGuide);

  if (!guide) return null;

  return (
    <Fade>
      <div className="guide-page_guide-info">
        <div className="guide-page_info-title-wrap">
          <div className="guide-page_avatar-wrap">
            <img
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
                    <span>{lang} </span>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Fade>
  );
};

export default GuideInfo;
