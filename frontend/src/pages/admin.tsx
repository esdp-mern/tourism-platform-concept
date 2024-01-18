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
import { GetServerSideProps } from 'next';
import { useTranslations } from 'next-intl';

const Admin = () => {
  const routers = useRouter();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectAdminStats);
  const t = useTranslations('admin');

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
                  <h4 className="stats-admin-title">{t('tours')}</h4>
                  <h2 className="stats-admin-info">
                    {t('total tours')}: {state?.toursAll}
                  </h2>
                  <h6>
                    {t('published')} {t('tours').toLowerCase()}:{' '}
                    {state?.toursPublished}
                  </h6>
                  <h6>
                    {t('unpublished')} {t('tours').toLowerCase()}:{' '}
                    {state?.toursUnpublished}
                  </h6>
                </div>
              </Link>
              <Link
                href={`/tours/create`}
                className="btn-create-tour"
                style={{ zIndex: 1 }}
              >
                {t('create tour')}
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
                  <h4 className="stats-admin-title">{t('guides')}</h4>
                  <h2 className="stats-admin-info">
                    {t('current')} {t('guides').toLowerCase()}:{' '}
                    {state?.guidesAll}
                  </h2>
                  <h6>
                    {t('active')} {t('guides').toLowerCase()}:{' '}
                    {state?.guidesPublished}
                  </h6>
                  <h6>
                    {t('non active')} {t('guides').toLowerCase()}:{' '}
                    {state?.guidesUnpublished}
                  </h6>
                </div>
              </Link>
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
                  <h4 className="stats-admin-title">{t('news')}</h4>
                </Link>
                <h2 className="stats-admin-info">
                  {t('total news')}: {state?.newsAll}
                </h2>
                <h6>
                  {t('published')} {t('news').toLowerCase()}:{' '}
                  {state?.newsPublished}
                </h6>
                <h6>
                  {t('unpublished')} {t('news').toLowerCase()}:{' '}
                  {state?.newsUnpublished}
                </h6>
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
                  <h4 className="stats-admin-title">{t('users')}</h4>
                </Link>
                <h2 className="stats-admin-info">
                  {t('total users')}: {state?.users}
                </h2>
                <h6>
                  {t('active moderators')}: {state?.usersModerators}
                </h6>
              </div>
            </div>
          </div>
          <div className="col-md-4 stretch-card">
            <div className="card bg-gradient-partners card-img-holder">
              <div className="card-body">
                <Link href={`/admin/partners/all`} className="stats-admin-link">
                  <Image
                    src={circle}
                    alt="circle"
                    className="card-img-absolute"
                  />
                </Link>
                <Link href={`/admin/partners/all`} className="stats-admin-link">
                  <h4 className="stats-admin-title">{t('partners')}</h4>
                </Link>
                <h2 className="stats-admin-info">
                  {t('current')} {t('partners').toLowerCase()}:{' '}
                  {state?.partnersAll}
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
                </Link>
                <Link
                  href={`/admin/partnerOrders/1`}
                  className="stats-admin-link"
                >
                  <h4 className="stats-admin-title">{t('partner orders')}</h4>
                </Link>
                <h2 className="stats-admin-info">
                  {t('total partner orders')} : {state?.partnerOrdersAll}
                </h2>
              </div>
            </div>
          </div>
          <div className="col-md-4 stretch-card">
            <div className="card bg-gradient-employee card-img-holder">
              <div className="card-body">
                <Link
                  href={`/admin/employees/all`}
                  className="stats-admin-link"
                >
                  <Image
                    src={circle}
                    alt="circle"
                    className="card-img-absolute"
                  />
                </Link>
                <Link
                  href={`/admin/employees/all`}
                  className="stats-admin-link"
                >
                  <h4 className="stats-admin-title">{t('employees')}</h4>
                </Link>
                <h2 className="stats-admin-info">
                  {t('employees')}: {state?.employeeAll}
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
                <h4 className="stats-admin-title">{t('orders')}</h4>
                <h2 className="stats-admin-info">
                  {t('total orders')}: {state?.ordersAll}
                </h2>
                <h6>
                  {t('booked')}: {state?.ordersBooked}
                </h6>
                <h6>
                  {t('being considered')}: {state?.ordersConsiders}
                </h6>
                <h6>
                  {t('approved orders')}: {state?.ordersApproved}
                </h6>
              </div>
            </div>
          </div>
          <div className="col-md-4 stretch-card">
            <div className="card bg-gradient-news card-img-holder">
              <div className="card-body">
                <Link
                  href={`/admin/guideOrders/1`}
                  className="stats-admin-link"
                >
                  <Image
                    src={circle}
                    alt="circle"
                    className="card-img-absolute"
                  />
                </Link>
                <Link
                  href={`/admin/guideOrders/1`}
                  className="stats-admin-link"
                >
                  <h4 className="stats-admin-title">{t('guide orders')}</h4>
                </Link>
                <h2 className="stats-admin-info">
                  {t('total guide orders')} : {state?.totalGuideOrders}
                </h2>
              </div>
            </div>
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
