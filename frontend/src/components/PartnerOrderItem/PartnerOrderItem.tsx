import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectUser } from '@/containers/users/usersSlice';
import { userRoles } from '@/constants';
import {
  changeStatusPartnerOrder,
  deletePartnerOrder,
  fetchPartnerOrders,
} from '@/containers/partners/partnersThunk';

interface Props {
  id: string;
  name: string;
  surname: string;
  message: string;
  status: string;
}

const GuideItem: React.FC<Props> = ({ id, name, surname, message, status }) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const onDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to reject this request?')) {
      await dispatch(deletePartnerOrder(id));
      dispatch(fetchPartnerOrders());
    }
  };

  const onChangeStatus = async (id: string) => {
    await dispatch(changeStatusPartnerOrder(id));
    dispatch(fetchPartnerOrders());
  };

  return (
    <div className="guide-card" style={{ background: 'white' }}>
      <div className="guide-card__content">
        <h2 className="guide-card__name">
          {name} {surname}
        </h2>
        <p>
          <strong>Message: </strong>
          {message}
        </p>
        <p className="guide-card__description">
          <strong>Status: </strong>
          {status}
        </p>
        {user && user.role === userRoles.admin ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="guide-card__btn" style={{ margin: '5px' }}>
              <button
                style={{ background: 'green' }}
                onClick={() => onChangeStatus(id)}
              >
                Accept
              </button>
            </div>
            <div className="guide-card__btn" style={{ margin: '5px' }}>
              <button
                onClick={() => onDelete(id)}
                style={{ background: '#8c0404' }}
              >
                Delete
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default GuideItem;
