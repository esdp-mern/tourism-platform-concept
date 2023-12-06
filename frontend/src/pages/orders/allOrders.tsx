import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectAllOrders,
  selectAllOrdersLoading,
  selectOrderStatusChanging,
  setMessages,
} from '@/containers/orders/ordersSlice';
import {
  changeOrderStatus,
  deleteOrder,
  fetchOrders,
} from '@/containers/orders/ordersThunk';
import { IOrder2 } from '@/type';
import PageLoader from '@/components/Loaders/PageLoader';
import axiosApi from '@/axiosApi';
import dayjs from 'dayjs';
import { addAlert, selectUser } from '@/containers/users/usersSlice';
import { boardNames, userRoles } from '@/constants';
import { useRouter } from 'next/router';

const AllOrders = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectAllOrders);
  const user = useAppSelector(selectUser);
  const router = useRouter();
  const bookedOrders = orders.filter((order) => order.status === 'booked');
  const underConsiderOrders = orders.filter(
    (order) => order.status === 'being considered',
  );
  const approvedOrders = orders.filter((order) => order.status === 'approved');
  const [currentOrder, setCurrentOrder] = useState({
    id: '',
    boardName: '',
  });
  const orderChangerLoading = useAppSelector(selectOrderStatusChanging);
  const allOrdersLoading = useAppSelector(selectAllOrdersLoading);

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

  const dragStartHandler = (id: string, boardName: string) => {
    setCurrentOrder({ id, boardName });
  };

  const dropHandler = async (boardName: string) => {
    if (currentOrder.boardName === boardName) return;
    await dispatch(
      changeOrderStatus({ id: currentOrder.id, status: boardName }),
    );
    dispatch(fetchOrders());
  };

  return (
    <div className="container">
      <PageLoader />
      <div className="orders-page">
        <h2 className="orders-title">Orders</h2>
        <div className="boards">
          {boardNames.map((boardName) => (
            <div className="order-board" key={boardName}>
              <h4 className="board-title">
                {boardName[0].toUpperCase() +
                  boardName.slice(1, boardName.length)}
              </h4>
              <div
                className="order-items"
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => dropHandler(boardName)}
              >
                {(boardName === 'booked'
                  ? bookedOrders
                  : boardName === 'being considered'
                    ? underConsiderOrders
                    : boardName === 'approved'
                      ? approvedOrders
                      : []
                ).map((order) => (
                  <div
                    className="order-item"
                    key={order._id}
                    draggable={true}
                    onDragStart={() =>
                      dragStartHandler(order._id, order.status)
                    }
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => e.preventDefault()}
                    onDragLeave={(e) => e.preventDefault()}
                    onDragEnd={(e) => e.preventDefault()}
                  >
                    {orderChangerLoading && currentOrder.id === order._id && (
                      <div className="order-status-loading">
                        <span className="order-status-loading-inner" />
                      </div>
                    )}
                    <span className="order-datetime">
                      {dayjs(order.datetime).format('DD.MM.YY HH:MM') || '-'}
                    </span>
                    <div className="user-info-row">
                      <span>{order.email || order.user?.email || '-'}</span>
                      <span>{order.phone || '-'}</span>
                    </div>
                    <div className="user-info-row">
                      <span className="order-date">
                        {dayjs(order.date).format('DD.MM.YY') || '-'}
                      </span>
                    </div>
                    <div className="user-info-row">
                      <span>{order.tour.name || '-'}</span>
                      <span>{order.price + 'kgs' || '-'}</span>
                    </div>
                    <div className="user-info-row">
                      <span>{order.guide.user.displayName || '-'}</span>
                      <span>{order.guide.user.email || '-'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllOrders;
