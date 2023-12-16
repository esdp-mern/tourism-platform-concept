import React from 'react';
import { Tour } from '@/type';
import Link from 'next/link';
import { Fade } from 'react-awesome-reveal';
import { apiUrl, userRoles } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectUser } from '@/containers/users/usersSlice';
import {
  deleteTour,
  fetchTours,
  publishTour,
} from '@/containers/tours/toursThunk';
import {
  selectDeleteTourLoading,
  selectTourPublishLoading,
} from '@/containers/tours/toursSlice';
import { useRouter } from 'next/router';

interface Props {
  tour: Tour;
  isAdmin?: boolean;
}

const TourItem: React.FC<Props> = ({ tour, isAdmin }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const imgLink = apiUrl + '/' + tour.mainImage;
  const publishLoading = useAppSelector(selectTourPublishLoading);
  const deleteLoading = useAppSelector(selectDeleteTourLoading);
  const onDelete = async () => {
    if (window.confirm('Are you sure you want to delete this tour?')) {
      await dispatch(deleteTour(tour._id));
      dispatch(fetchTours());
    }
  };

  const onPublish = async () => {
    if (window.confirm('Are you sure you want to publish this tour?')) {
      await dispatch(publishTour(tour._id));
      dispatch(fetchTours());
    }
  };

  return (
    <Fade>
      <div className="tour-item">
        <Link href={`/tours/${tour._id}`} className="tour-item-top">
          <img src={imgLink} alt={tour.name} className="tour-item-img" />
          <div className="tour-item-price">{tour.price.toString()} KGS</div>
          {tour.guides.length > 0 ? (
            <div className="tour-item-guide-avatar">
              <img
                src={
                tour.guides[0].user.avatar &&
                tour.guides[0].user.avatar.startsWith('http')
                  ? tour.guides[0].user.avatar
                  : apiUrl + '/' + tour.guides[0].user.avatar
              }
                alt="guide"
              />
            </div>
          ) : null}
          {isAdmin && user && user.role === userRoles.admin ? (
            <div
              className={`${
                tour.isPublished ? 'published-tour' : 'unpublished-tour'
              } tour-info-publish`}
            >
              {tour.isPublished ? 'published' : 'unpublished'}
            </div>
          ) : null}
        </Link>
        <div className="tour-item-bottom">
          <Link href={`/tours/${tour._id}`} className="tour-item-links">
            <h2 className="tour-item-title">{tour.name}</h2>
          </Link>
          <div className="tour-item-country">{tour.country}</div>
          <div className="tour-item-info">
            <div className="tour-item-duration">{tour.duration} days</div>
          </div>
          {isAdmin && user && user.role === userRoles.admin ? (
            <div className="buttons-tour">
              <button
                className="btn-delete-tour"
                type="button"
                onClick={onDelete}
                disabled={deleteLoading ? deleteLoading === tour._id : false}
              >
                {deleteLoading && deleteLoading === tour._id
                  ? 'deleting...'
                  : 'Delete'}
              </button>
              <button
                className="btn-publish-tour"
                type="button"
                onClick={onPublish}
                disabled={publishLoading ? publishLoading === tour._id : false}
              >
                {publishLoading && publishLoading === tour._id
                  ? tour.isPublished
                    ? 'unpublishing...'
                    : 'publishing...'
                  : tour.isPublished
                    ? 'Unpublish'
                    : 'Publish'}
              </button>
              <button
                type="button"
                className="btn-tour-edit"
                onClick={() => {
                  router.push(`/tours/edit/${tour._id}`).then((r) => r);
                }}
              >
                Edit
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </Fade>
  );
};

export default TourItem;
