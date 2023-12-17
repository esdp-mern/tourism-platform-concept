import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectGuideUser,
  setGuideEditorModal,
} from '@/containers/guides/guidesSlice';
import EditGuideModal from '@/components/EditGuideProfile/EditGuideModal';

const GuideProfile = () => {
  const guide = useAppSelector(selectGuideUser);
  const dispatch = useAppDispatch();

  if (!guide) return null;

  return (
    <div className="guide-profile" style={{ position: 'relative' }}>
      <EditGuideModal />
      <div className="container">
        <button
          className="edit-profile page-profile_edit-btn"
          onClick={() => dispatch(setGuideEditorModal())}
        >
          Edit description
        </button>
        <div>
          <p>{guide.description}</p>
        </div>
        <div>
          <table className="profile-page_table">
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
      </div>
    </div>
  );
};

export default GuideProfile;
