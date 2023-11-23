import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectAllOrders, setMessages } from '@/containers/orders/ordersSlice';
import { deleteOrder, fetchOrders } from '@/containers/orders/ordersThunk';
import { IOrder2 } from '@/type';
import PageLoader from '@/components/PageLoader/PageLoader';
import axiosApi from '@/axiosApi';
import dayjs from 'dayjs';
import { addAlert, selectUser } from '@/containers/users/usersSlice';
import { userRoles } from '@/constants';
import { useRouter } from 'next/router';

const AllOrders = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectAllOrders);
  const user = useAppSelector(selectUser);
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== userRoles.moderator) {
      void router.push('/');
    }

    let datetime = new Date().toISOString();
    dispatch(fetchOrders());

    if (orders.length) {
      datetime = orders[orders.length - 1].datetime;
    }
    const interval = setInterval(async () => {
      await axiosApi<IOrder2[]>(`orders/?datetime=${datetime}`).then((res) => {
        if (res.data.length) {
          dispatch(setMessages(res.data));
          datetime = res.data[res.data.length - 1].datetime;
        }
      });
    }, 12000);

    return () => {
      clearInterval(interval);
    };
    // Do NOT add "orders" as dependency, otherwise code recursion starts!
  }, [dispatch, user, router]);

  const onDelete = async (id: string) => {
    if (window.confirm('Do you want to delete this order?')) {
      await dispatch(deleteOrder(id));
      dispatch(addAlert({ message: 'Order is removed', type: 'info' }));
      dispatch(fetchOrders());
    }
  };

  return (
    <div className="container">
      <PageLoader />
      <div className="orders-page">
        <div>
          <h2 className="orders-title">Orders</h2>
          <div className="order-table-titles">
            <div className="order-table-titles-tour">Tour</div>
            <div className="order-table-titles-guide">Guide</div>
            <div className="order-table-titles-date">Date</div>
            <div className="order-table-titles-price">Price</div>
            <div className="order-table-titles-user">User</div>
            <div className="order-table-titles-email">Email</div>
            <div className="order-table-titles-phone">Phone</div>
            <div className="order-table-titles-delete"></div>
          </div>
          <div className="order-table">
            {orders.map((ord) => (
              <div key={ord._id} className="order-list">
                <div className="order-item">
                  <div className="order-tour">{ord.tour.name}</div>
                  <div className="order-guide">
                    {ord.guide.user.displayName}
                  </div>
                  <div className="order-date">
                    {dayjs(ord.date).format('DD.MM.YYYY')}
                  </div>
                  <div className="order-price">{ord.price} KGS</div>
                  <div className="order-user">
                    {ord.user ? ord.user.displayName : '-'}
                  </div>
                  <div className="order-email">
                    {ord.email ? ord.email : '-'}
                  </div>
                  <div className="order-phone">
                    {ord.phone ? ord.phone : '-'}
                  </div>
                  <div
                    className="order-delete"
                    onClick={() => onDelete(ord._id)}
                  >
                    X
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllOrders;
