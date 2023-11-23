import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectAllOrders, setMessages } from '@/containers/orders/ordersSlice';
import { fetchOrders } from '@/containers/orders/ordersThunk';
import { apiUrl } from '@/constants';
import { IOrder2 } from '@/type';
import { wrapper } from '@/store/store';
import PageLoader from '@/components/PageLoader/PageLoader';

const AllOrders = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectAllOrders);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const posts = await dispatch(fetchOrders()).unwrap();
        if (posts.length > 0) {
          dispatch(setMessages(posts));
          const lastMessage = posts[posts.length - 1];
          let date = lastMessage.datetime;

          setInterval(async () => {
            try {
              const response = await fetch(
                apiUrl + '/orders' + '?datetime=' + date,
              );
              if (response.ok) {
                const newPosts = await response.json();
                if (newPosts.length > 0) {
                  const newLastMessage = newPosts[newPosts.length - 1];
                  date = newLastMessage.datetime;
                  dispatch(
                    setMessages((prevState: IOrder2[]) => [
                      ...prevState,
                      ...newPosts,
                    ]),
                  );
                }
              }
            } catch (error) {
              console.log(error);
            }
          }, 10000);
        }
      } catch (error) {
        console.log(error);
      }
    };

    void fetchData();
  }, [dispatch]);
  return (
    <div className="container">
      <PageLoader />
      <div className="orders-page">
        <div>
          <h2 className="orders-title">Orders</h2>
          {orders.map((ord) => (
            <div key={ord._id} className="order-list">
              <div className="order-item">{ord.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
//   await store.dispatch(fetchOrders());
// });
export default AllOrders;
