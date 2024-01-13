import React from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectUser } from '@/containers/users/usersSlice';
import { userRoles } from '@/constants';
import { deleteGuide, fetchAdminGuides } from '@/containers/guides/guidesThunk';
import { useTranslations } from 'next-intl';

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
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const t = useTranslations('about');

  const onDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this guide?')) {
      await dispatch(deleteGuide(id));
      dispatch(fetchAdminGuides());
    }
  };

  return (
    <div className="guide-card">
      <img
        src={imageUrl}
        alt={`${name} - ${role}`}
        className="guide-card__image"
      />
      <div className="guide-card__content">
        <h2 className="guide-card__name">{name}</h2>
        <p className="guide-card__description">{description}</p>
        <Link href={`/guides/${id}`} className="guide-card__link">
          {t(`guideViewMore`)}
        </Link>
        {user && user.role === userRoles.admin ? (
          <div className="guide-card__btn">
            <button onClick={() => onDelete(id)}>{t(`guideDelete`)}</button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default GuideItem;
