import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectAllPartners } from '@/containers/about/aboutSlice';
import { fetchPartners } from '@/containers/about/aboutThunk';
import { setIsLightMode } from '@/containers/config/configSlice';
import PageLoader from '@/components/Loaders/PageLoader';
import Link from 'next/link';
import { apiUrl, userRoles } from '@/constants';
import { deletePartner } from '@/containers/partners/partnersThunk';
import Custom404 from '@/pages/404';
import { selectUser } from '@/containers/users/usersSlice';
import Image from 'next/image';
import { GetServerSideProps } from 'next';

const Partners = () => {
  const dispatch = useAppDispatch();
  const partners = useAppSelector(selectAllPartners);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(setIsLightMode(true));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchPartners());
  }, [dispatch]);

  if (!user || user.role !== userRoles.admin) {
    return <Custom404 errorType="tour" />;
  }

  const onDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this partner?')) {
      await dispatch(deletePartner(id));
      dispatch(fetchPartners());
    }
  };

  return (
    <div className="all-tours">
      <PageLoader />
      <div>
        <div className="container">
          <div style={{ margin: '100px auto' }}>
            <div className="about-page-partners-cards">
              {partners.map((partner) =>
                partner.link ? (
                  <div key={partner._id} className="partners-admin-card">
                    <div className="about-page-partners-card">
                      {partner.image || (partner.image && partner.name) ? (
                        <Image
                          width={200}
                          height={200}
                          src={apiUrl + '/' + partner.image}
                          alt={partner._id}
                        />
                      ) : (
                        partner.name
                      )}
                    </div>
                    <div className="buttons-admin-partners">
                      <button
                        className="btn-delete-tour"
                        onClick={() => onDelete(partner._id)}
                      >
                        Delete
                      </button>
                      <Link
                        href={`/partners/edit/${partner._id}`}
                        className="btn-tour-edit"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div key={partner._id} className="partners-admin-card">
                    <div className="about-page-partners-card" key={partner._id}>
                      {partner.image || (partner.image && partner.name) ? (
                        <Image
                          width={200}
                          height={200}
                          src={apiUrl + '/' + partner.image}
                          alt={partner._id}
                        />
                      ) : (
                        partner.name
                      )}
                    </div>
                    <div className="buttons-admin-partners">
                      <button
                        className="btn-delete-tour"
                        onClick={() => onDelete(partner._id)}
                      >
                        Delete
                      </button>
                      <Link
                        href={`/partners/edit/${partner._id}`}
                        className="btn-tour-edit"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;
export const getStaticProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: (
        await import(`../../../../public/locales/${locale}/translation.json`)
      ).default,
    },
  };
};
