import React, { useEffect } from 'react';
import PageLoader from '@/components/Loaders/PageLoader';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/router';
import { selectUser } from '@/containers/users/usersSlice';
import { userRoles } from '@/constants';
import { setIsLightMode } from '@/containers/config/configSlice';
import { selectAdminStats } from '@/containers/statistics/statisticsSlice';
import { fetchStatsAdmin } from '@/containers/statistics/statisticsThunk';
import Link from 'next/link';
import { GetServerSideProps } from 'next';

const Admin = () => {
  const routers = useRouter();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectAdminStats);

  useEffect(() => {
    document.addEventListener('DOMContentLoaded', () => {
      if (!user || user.role !== userRoles.admin) {
        routers.push('/').then((r) => r);
      }
    });
    dispatch(setIsLightMode(true));
    dispatch(fetchStatsAdmin());
  }, [dispatch, routers, user]);
  return (
    <>
      <PageLoader />
      <div className="fixed-toolbar"></div>
      <div className="container">
        <div className="admin-cards">
          <div className="admin-card">
            <Link href={`/admin/tours/1`} className="admin-card-body">
              <div className="admin-card-body">
                <h1 className="admin-card-title">Tours</h1>
                <h3 className="admin-card-info">
                  Total tours: {state?.toursAll}
                </h3>
                <h4>Published tours: {state?.toursPublished}</h4>
                <h4>Unpublished tours: {state?.toursUnpublished}</h4>
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
          <div className="admin-card">
            <Link href={`/admin/guides/1`} className="admin-card-body">
              <h1 className="admin-card-title">Guides</h1>
              <h3 className="admin-card-info">
                Current guides: {state?.guidesAll}
              </h3>
              <h4>Active guides: {state?.guidesPublished}</h4>
              <h4>Non active guides: {state?.guidesUnpublished}</h4>
            </Link>
          </div>
          <div className="admin-card">
            <Link href={`/admin/news/1`} className="admin-card-body">
              <h1 className="admin-card-title">News</h1>
              <h3 className="admin-card-info">Total news: {state?.newsAll}</h3>
              <h4>Published news: {state?.newsPublished}</h4>
              <h4>Unpublished news: {state?.newsUnpublished}</h4>
            </Link>
          </div>
          <div className="admin-card">
            <Link href={`/admin/allUsers/1`} className="admin-card-body">
              <h1 className="admin-card-title">Users</h1>
              <h3 className="admin-card-info">Total users: {state?.users}</h3>
              <h4>Active moderators: {state?.usersModerators}</h4>
            </Link>
          </div>
          <div className="admin-card">
            <Link href={`/admin/partners/all`} className="admin-card-body">
              <h1 className="admin-card-title">Partners</h1>
              <h3 className="admin-card-info">
                Current partners: {state?.partnersAll}
              </h3>
            </Link>
          </div>
          <div className="admin-card">
            <Link href={`/admin/partnerOrders/1`} className="admin-card-body">
              <h1 className="admin-card-title">Partner orders</h1>
              <h3 className="admin-card-info">
                Total partner orders: {state?.partnerOrdersAll}
              </h3>
            </Link>
          </div>
          <div className="admin-card">
            <Link href={`/admin/employees/all`} className="admin-card-body">
              <h1 className="admin-card-title">Employees</h1>
              <h3 className="admin-card-info">
                Employees: {state?.employeeAll}
              </h3>
            </Link>
          </div>
          <div className="admin-card admin-card-not-link">
            <div className="admin-card-body">
              <h1 className="admin-card-title">Orders</h1>
              <h3 className="admin-card-info">
                Total orders: {state?.ordersAll}
              </h3>
              <h4>Booked: {state?.ordersBooked}</h4>
              <h4>Being considers: {state?.ordersConsiders}</h4>
              <h4>Approved orders: {state?.ordersApproved}</h4>
            </div>
          </div>
          <div className="admin-card">
            <Link href={`/admin/guideOrders/1`} className="admin-card-body">
              <h1 className="admin-card-title">Guide Orders</h1>
              <h3 className="admin-card-info">
                Total orders: {state?.totalGuideOrders}
              </h3>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
export const getStaticProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: (
        await import(`../../public/locales/${locale}/translation.json`)
      ).default,
    },
  };
};
