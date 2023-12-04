import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectAllPartners } from '@/containers/about/aboutSlice';
import { fetchPartners } from '@/containers/about/aboutThunk';
import Link from 'next/link';
import { apiUrl } from '@/constants';

const PartnerItem = () => {
  const dispatch = useAppDispatch();
  const partners = useAppSelector(selectAllPartners);

  useEffect(() => {
    dispatch(fetchPartners());
  }, [dispatch]);
  return (
    <div className="about-page-partners-cards">
      {partners.map((partner) =>
        partner.link ? (
          <Link
            href={partner.link}
            key={partner._id}
            className="about-page-partners-card-link"
          >
            <div className="about-page-partners-card">
              {partner.image || (partner.image && partner.name) ? (
                <img src={apiUrl + '/' + partner.image} alt={partner._id} />
              ) : (
                partner.name
              )}
            </div>
          </Link>
        ) : (
          <div className="about-page-partners-card" key={partner._id}>
            {partner.image || (partner.image && partner.name) ? (
              <img src={apiUrl + '/' + partner.image} alt={partner._id} />
            ) : (
              partner.name
            )}
          </div>
        ),
      )}
    </div>
  );
};

export default PartnerItem;
