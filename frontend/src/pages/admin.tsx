import React, { useEffect } from 'react';
import PageLoader from '@/components/Loaders/PageLoader';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/router';
import { selectUser } from '@/containers/users/usersSlice';
import { userRoles } from '@/constants';
import { setIsLightMode } from '@/containers/config/configSlice';
import circle from '@/assets/images/circle.png';
import { selectAdminStats } from '@/containers/statistics/statisticsSlice';
import { fetchStatsAdmin } from '@/containers/statistics/statisticsThunk';
import Link from 'next/link';
import Image from 'next/image';

const Admin = () => {
  const routers = useRouter();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectAdminStats);

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
              <Link href={`/admin/tours/1`} className="stats-admin-link">
                <div className="card-body">
                  <Image
                    src={circle}
                    alt="circle"
                    className="card-img-absolute"
                  />
                  <h4 className="stats-admin-title">Tours </h4>
                  <h2 className="stats-admin-info">
                    Total tours: {state?.toursAll}
                  </h2>
                  <h6>Published tours: {state?.toursPublished}</h6>
                  <h6>Unpublished tours: {state?.toursUnpublished}</h6>
                </div>
              </Link>
              <Link
                href={`/tours/create`}
                className="btn-create-tour"
                style={{ zIndex: 1 }}
              >
                Create Tour
              </Link>
            </div>
          </div>
          <div className="col-md-4 stretch-card">
            <div className="card bg-gradient-guides card-img-holder">
              <Link href={`/admin/guides/1`} className="stats-admin-link">
                <div className="card-body">
                  <Image
                    src={circle}
                    alt="circle"
                    className="card-img-absolute"
                  />
                  <h4 className="stats-admin-title">Guides</h4>
                  <h2 className="stats-admin-info">
                    Current guides: {state?.guidesAll}
                  </h2>
                  <h6>Active guides: {state?.guidesPublished}</h6>
                  <h6>Non active guides: {state?.guidesUnpublished}</h6>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-md-4 stretch-card">
            <div className="card bg-gradient-news card-img-holder">
              <Link href={`/admin/news/1`} className="stats-admin-link">
                <div className="card-body">
                  <Image
                    src={circle}
                    alt="circle"
                    className="card-img-absolute"
                  />
                  <h4 className="stats-admin-title">News</h4>
                  <h2 className="stats-admin-info">
                    Total news: {state?.newsAll}
                  </h2>
                  <h6>Published news: {state?.newsPublished}</h6>
                  <h6>Unpublished news: {state?.newsUnpublished}</h6>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-md-4 stretch-card">
            <div className="card bg-gradient-users card-img-holder">
              <Link href={`/admin/allUsers/1`} className="stats-admin-link">
                <div className="card-body">
                  <Image
                    src={circle}
                    alt="circle"
                    className="card-img-absolute"
                  />
                  <h4 className="stats-admin-title">Users</h4>
                  <h2 className="stats-admin-info">
                    Total users: {state?.users}
                  </h2>
                  <h6>Active moderators: {state?.usersModerators}</h6>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-md-4 stretch-card">
            <div className="card bg-gradient-partners card-img-holder">
              <Link href={`/admin/partners/all`} className="stats-admin-link">
                <div className="card-body">
                  <Image
                    src={circle}
                    alt="circle"
                    className="card-img-absolute"
                  />
                  <h4 className="stats-admin-title">Partners</h4>
                  <h2 className="stats-admin-info">
                    Current partners: {state?.partnersAll}
                  </h2>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-md-4 stretch-card">
            <div className="card bg-gradient-partner-orders card-img-holder">
              <Link
                href={`/admin/partnerOrders/1`}
                className="stats-admin-link"
              >
                <div className="card-body">
                  <Image
                    src={circle}
                    alt="circle"
                    className="card-img-absolute"
                  />
                  <h4 className="stats-admin-title">Partner orders</h4>
                  <h2 className="stats-admin-info">
                    Total partner orders: {state?.partnerOrdersAll}
                  </h2>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-md-4 stretch-card">
            <div className="card bg-gradient-employee card-img-holder">
              <Link href={`/admin/employees/all`} className="stats-admin-link">
                <div className="card-body">
                  <Image
                    src={circle}
                    alt="circle"
                    className="card-img-absolute"
                  />
                  <h4 className="stats-admin-title">Employees</h4>
                  <h2 className="stats-admin-info">
                    Employees: {state?.employeeAll}
                  </h2>
                </div>
              </Link>
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
                  Total orders: {state?.ordersAll}
                </h2>
                <h6>Booked: {state?.ordersBooked}</h6>
                <h6>Being considers: {state?.ordersConsiders}</h6>
                <h6>Approved orders: {state?.ordersApproved}</h6>
              </div>
            </div>
          </div>
          <div className="col-md-4 stretch-card">
            <div className="card bg-gradient-news card-img-holder">
              <Link href={`/admin/guideOrders/1`} className="stats-admin-link">
                <div className="card-body">
                  <Image
                    src={circle}
                    alt="circle"
                    className="card-img-absolute"
                  />
                  <h4 className="stats-admin-title">Guide Orders</h4>
                  <h2 className="stats-admin-info">
                    Total orders: {state?.totalGuideOrders}
                  </h2>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
