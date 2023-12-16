import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addAlert, selectUser } from '@/containers/users/usersSlice';
import { apiUrl, userRoles } from '@/constants';
import {
  acceptPartner,
  deletePartnerOrder,
  fetchPartnerOrders,
} from '@/containers/partners/partnersThunk';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IPartnerAccept } from '@/type';
import { AxiosError } from 'axios';

interface Props {
  id: string;
  name: string;
  message: string;
  number: string;
  image: string;
  link: string;
}

const PartnerOrderItem: React.FC<Props> = ({
  id,
  name,
  message,
  number,
  image,
  link,
}) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const initialState = {
    name: name,
    link: link,
    image: image,
  };
  const router = useRouter();
  const [state, setState] = useState<IPartnerAccept>(initialState);

  useEffect(() => {
    dispatch(fetchPartnerOrders());
  }, [dispatch]);

  const onAccept = async (id: string) => {
    if (!(state.name || state.image)) {
      dispatch(
        addAlert({ message: 'Name or Image is required', type: 'error' }),
      );
      return;
    }

    try {
      await dispatch(acceptPartner(state));
      dispatch(addAlert({ message: 'Request is sent', type: 'info' }));
      await dispatch(deletePartnerOrder(id));
      setState(initialState);
      await dispatch(fetchPartnerOrders());
      void router.push('/admin');
    } catch (e) {
      if (e instanceof AxiosError) {
        dispatch(addAlert({ message: 'Something is wrong!', type: 'error' }));
      }
    }
  };

  const onDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to reject this request?')) {
      await dispatch(deletePartnerOrder(id));
      await dispatch(fetchPartnerOrders());
    }
  };

  return (
    <div className="guide-card" style={{ background: 'white' }}>
      <div className="guide-card__content">
        <h2 className="guide-card__name">{name}</h2>
        <p>
          <strong>Message: </strong>
          {message}
        </p>
        <p>
          <strong>Number: </strong>
          {number}
        </p>
        {image && <img src={apiUrl + '/' + image} alt={name} />}

        {link && (
          <p>
            <Link href={link}>{link}</Link>
          </p>
        )}
        {user && user.role === userRoles.admin ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '5px',
            }}
          >
            <div className="guide-card__btn" style={{ margin: '5px' }}>
              <button
                style={{ background: 'green' }}
                onClick={() => onAccept(id)}
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

export default PartnerOrderItem;
