import React from 'react';
import { useAppSelector } from '@/store/hooks';
import { selectOrdersUser } from '@/containers/orders/ordersSlice';
import dayjs from 'dayjs';

const UserOrders = () => {
  const orders = useAppSelector(selectOrdersUser);

  return (
    <div className="orders-list">
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order._id} className="orders">
            <h4 className="orders_tour">Tour: {order.tour.name}</h4>
            <p className="orders_guide">
              Guide: {order.guide.user.displayName}
            </p>
            <p className="orders_datetime">
              Date: {dayjs(order.datetime).format('DD.MM.YY HH:MM') || '-'}
            </p>
            <p className="orders_date">
              Date tour: {dayjs(order.date).format('DD.MM.YY HH:MM') || '-'}
            </p>
            <p className="orders_price">Price: {order.price}KGS</p>
            <div className="orders_status">Status: {order.status}</div>
          </div>
        ))
      ) : (
        <span>No orders</span>
      )}
    </div>
  );
};

export default UserOrders;
