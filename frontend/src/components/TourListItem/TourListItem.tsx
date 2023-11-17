import React from 'react';
import { Tour } from '@/type';
import Link from 'next/link';
import { Fade } from 'react-awesome-reveal';
import { apiUrl, userRoles } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectUser } from '@/containers/users/usersSlice';
import { deleteTour, fetchTours } from '@/containers/tours/toursThunk';
import { selectDeleteTourLoading } from '@/containers/tours/toursSlice';
import { useRouter } from 'next/router';

interface Props {
  tour: Tour;
}

const TourItem: React.FC<Props> = ({ tour }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const imgLink = apiUrl + '/' + tour.mainImage;

  const deleteLoading = useAppSelector(selectDeleteTourLoading);
  const onDelete = async () => {
    if (window.confirm('Are you sure you want to delete this tour?')) {
      await dispatch(deleteTour(tour._id));
      dispatch(fetchTours());
    }
  };

  return (
    <Fade>
      <Link href={`/tours/${tour._id}`} className="tour-item">
        <div className="tour-item-top">
          <img src={imgLink} alt={tour.name} className="tour-item-img" />
          <div className="tour-item-price">{tour.price.toString()} KGS</div>
        </div>
        <div className="tour-item-bottom">
          <span className="tour-item-links">
            <h2 className="tour-item-title">{tour.name}</h2>
          </span>
          <div className="tour-item-country">{tour.country}</div>
          <div className="tour-item-info">
            <div className="tour-item-duration">{tour.duration} days</div>
          </div>
          {user && user.role === userRoles.admin && (
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
                type="button"
                className="btn-tour-edit"
                onClick={() => {
                  router.push(`/tours/edit/${tour._id}`).then((r) => r);
                }}
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </Link>
    </Fade>
  );
};

export default TourItem;
