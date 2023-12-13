import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectDeleteGuideOrderLoading } from '@/containers/guides/guidesSlice';
import {
  deleteGuideOrder,
  fetchGuideOrders,
} from '@/containers/guides/guidesThunk';
import Link from 'next/link';

interface Props {
  _id: string;
  name: string;
  surname: string;
  number: string;
  message: string;
}

const GuideOrder: React.FC<Props> = ({
  _id,
  name,
  surname,
  number,
  message,
}) => {
  const dispatch = useAppDispatch();
  const deleteLoading = useAppSelector(selectDeleteGuideOrderLoading);
  const onDelete = async () => {
    if (window.confirm('Are you sure you want to reject this guide request?')) {
      await dispatch(deleteGuideOrder(_id));
      dispatch(fetchGuideOrders());
    }
  };

  return (
    <div className="guide-card">
      <div className="guide-card__content">
        <div className="guide-card__name">
          <h3>
            {name} {surname}
          </h3>
        </div>
        <div>
          <p className="guide-card-orders__info">
            <strong>Number:</strong> {number}
          </p>
          <p className="guide-card-orders__info">
            <strong>Message:</strong> {message}
          </p>
        </div>
        <div className="guide-card-orders__buttons">
          <Link
            href={`/guides/${_id}`}
            className="btn-tour-edit"
            style={{ margin: '5px' }}
          >
            Accept
          </Link>
          <button
            className="btn-delete-tour"
            onClick={onDelete}
            style={{ margin: '5px' }}
            disabled={deleteLoading ? deleteLoading === _id : false}
          >
            {deleteLoading && deleteLoading === _id ? 'deleting...' : 'Reject'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuideOrder;
