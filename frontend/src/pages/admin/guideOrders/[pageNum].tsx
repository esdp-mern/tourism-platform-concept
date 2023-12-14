import React, { useEffect, useState } from 'react';
import PageLoader from '@/components/Loaders/PageLoader';
import Pagination from '@/components/Pagination/Pagination';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/router';
import { selectUser } from '@/containers/users/usersSlice';
import { setIsLightMode } from '@/containers/config/configSlice';
import { userRoles } from '@/constants';
import { selectGuideOrders } from '@/containers/guides/guidesSlice';
import { fetchGuideOrders } from '@/containers/guides/guidesThunk';
import GuideOrder from '@/components/GuideOrder/GuideOrder';
import Custom404 from '@/pages/404';

const AllGuideOrdersPage = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectGuideOrders);
  const routers = useRouter();
  const user = useAppSelector(selectUser);
  const [ordersPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastRecord = currentPage * ordersPerPage;
  const indexOfFirstRecord = indexOfLastRecord - ordersPerPage;
  const currentRecords = orders.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(orders.length / ordersPerPage);

  useEffect(() => {
    dispatch(setIsLightMode(true));
    if (user && user.role !== userRoles.admin) {
      routers.push('/').then((r) => r);
    }
  }, [dispatch, routers, user]);

  useEffect(() => {
    dispatch(fetchGuideOrders());
  }, [dispatch]);

  const onSetCurrentPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (!user || user.role !== userRoles.admin) {
    return <Custom404 errorType="tour" />;
  }

  return (
    <div className="all-guides">
      <PageLoader />
      <div>
        <div className="container">
          <div>
            <div className="buttons-admin-tour"></div>
            {!orders || orders.length <= 0 ? (
              <div className="title-none-tour">There are no guide request.</div>
            ) : (
              <div>
                <div className="tours-admin-page">
                  {currentRecords.map((orders) => (
                    <div className="card-news" key={orders._id}>
                      <GuideOrder
                        _id={orders._id}
                        name={orders.name}
                        surname={orders.surname}
                        number={orders.number}
                        message={orders.message}
                      />
                    </div>
                  ))}
                </div>
                <div className="tours-page-paginate">
                  <Pagination
                    pathname={'/admin/guideOrders/'}
                    nPages={nPages}
                    currentPage={currentPage}
                    onSetCurrentPage={onSetCurrentPage}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllGuideOrdersPage;
