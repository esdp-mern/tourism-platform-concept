import React, { useEffect } from 'react';
import PageLoader from '@/components/Loaders/PageLoader';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/router';
import { selectUser } from '@/containers/users/usersSlice';
import { userRoles } from '@/constants';
import { setIsLightMode } from '@/containers/config/configSlice';
import circle from '@/assets/images/circle.png';
import {
  selectAdminStats,
  selectStatsFetchLoading,
} from '@/containers/statistics/statisticsSlice';
import { fetchStatsAdmin } from '@/containers/statistics/statisticsThunk';
import Link from 'next/link';
import Image from 'next/image';

const Admin = () => {
  const routers = useRouter();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const stats = useAppSelector(selectAdminStats);
  const statsLoading = useAppSelector(selectStatsFetchLoading);

  useEffect(() => {
    if (!user || user.role !== userRoles.admin) {
      routers.push('/').then((r) => r);
    }
    dispatch(setIsLightMode(true));
    dispatch(fetchStatsAdmin());
  }, [dispatch, routers, user]);
  return (
    <>
      <PageLoader />
      <div className="fixed-toolbar"></div>
      <div className="container" style={{ marginTop: '10px' }}>
        <div className="row">
          <div className="col-md-4 stretch-card">
            <div className="card bg-gradient-tours card-img-holder">
              <div className="card-body">
                <Link href={`/admin/tours/1`} className="stats-admin-link">
                  <Image
                    src={circle}
                    alt="circle"
                    className="card-img-absolute"
                  />
                </Link>
                <Link href={`/admin/tours/1`} className="stats-admin-link">
                  <h4 className="stats-admin-title">Tours </h4>
                </Link>
                <h2 className="stats-admin-info">
                  Total tours: {stats?.toursAll}
                </h2>
                <h6>Published tours: {stats?.toursPublished}</h6>
                <h6>Unpublished tours: {stats?.toursUnpublished}</h6>

                <Link href={`/tours/create`} className="btn-create-tour">
                  Create Tour
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 stretch-card">
            <div className="card bg-gradient-guides card-img-holder">
              <div className="card-body">
                <Link href={`/admin/guides/1`} className="stats-admin-link">
                  <Image
                    src={circle}
                    alt="circle"
                    className="card-img-absolute"
                  />
                </Link>
                <Link href={`/admin/guides/1`} className="stats-admin-link">
                  <h4 className="stats-admin-title">Guides</h4>
                </Link>
                <h2 className="stats-admin-info">
                  Current guides: {stats?.guidesAll}
                </h2>
                <h6>Active guides: {stats?.guidesPublished}</h6>
                <h6>Non active guides: {stats?.guidesUnpublished}</h6>
              </div>
            </div>
          </div>
          <div className="col-md-4 stretch-card">
            <div className="card bg-gradient-news card-img-holder">
              <div className="card-body">
                <Link href={`/admin/news/1`} className="stats-admin-link">
                  <Image
                    src={circle}
                    alt="circle"
                    className="card-img-absolute"
                  />
                </Link>
                <Link href={`/admin/news/1`} className="stats-admin-link">
                  <h4 className="stats-admin-title">News</h4>
                </Link>
                <h2 className="stats-admin-info">
                  Total news: {stats?.newsAll}
                </h2>
                <h6>Published news: {stats?.newsPublished}</h6>
                <h6>Unpublished news: {stats?.newsUnpublished}</h6>
              </div>
            </div>
          </div>
          <div className="col-md-4 stretch-card">
            <div className="card bg-gradient-users card-img-holder">
              <div className="card-body">
                <Link href={`/admin/allUsers/1`} className="stats-admin-link">
                  <Image
                    src={circle}
                    alt="circle"
                    className="card-img-absolute"
                  />
                </Link>
                <Link href={`/admin/allUsers/1`} className="stats-admin-link">
                  <h4 className="stats-admin-title">Users</h4>
                </Link>
                <h2 className="stats-admin-info">
                  Total users: {stats?.users}
                </h2>
                <h6>Active moderators: {stats?.usersModerators}</h6>
              </div>
            </div>
          </div>
          <div className="col-md-4 stretch-card">
            <div className="card bg-gradient-partners card-img-holder">
              <div className="card-body">
                <Image
                  src={circle}
                  alt="circle"
                  className="card-img-absolute"
                />
                <h4 className="stats-admin-title">Partners</h4>
                <h2 className="stats-admin-info">
                  Current partners: {stats?.partnersAll}
                </h2>
              </div>
            </div>
          </div>
          <div className="col-md-4 stretch-card">
            <div className="card bg-gradient-partner-orders card-img-holder">
              <div className="card-body">
                <Link
                  href={`/admin/partnerOrders/1`}
                  className="stats-admin-link"
                >
                  <Image
                    src={circle}
                    alt="circle"
                    className="card-img-absolute"
                  />
                  <h4 className="stats-admin-title">Partner orders</h4>
                  <h2 className="stats-admin-info">
                    Total partner orders: {stats?.partnerOrdersAll}
                  </h2>
                  <h6>
                    Approved partner orders: {stats?.partnerOrdersApproved}
                  </h6>
                  <h6>Pending partner orders: {stats?.partnerOrdersPending}</h6>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 stretch-card">
            <div className="card bg-gradient-employee card-img-holder">
              <div className="card-body">
                <Image
                  src={circle}
                  alt="circle"
                  className="card-img-absolute"
                />
                <h4 className="stats-admin-title">Employees</h4>
                <h2 className="stats-admin-info">
                  Employees: {stats?.employeeAll}
                </h2>
              </div>
            </div>
          </div>
          <div className="col-md-4 stretch-card">
            <div className="card bg-gradient-orders card-img-holder">
              <div className="card-body">
                <Image
                  src={circle}
                  alt="circle"
                  className="card-img-absolute"
                />
                <h4 className="stats-admin-title">Orders</h4>
                <h2 className="stats-admin-info">
                  Total orders: {stats?.ordersAll}
                </h2>
                <h6>Booked: {stats?.ordersBooked}</h6>
                <h6>Being considers: {stats?.ordersConsiders}</h6>
                <h6>Approved orders: {stats?.ordersApproved}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
