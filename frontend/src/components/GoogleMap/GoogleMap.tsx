import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface IProps {
  width: string;
  height: string;
  map: string;
  mapLink: string;
}

const GoogleMap: React.FC<IProps> = ({ map, mapLink }) => {
  const t = useTranslations('oneTour');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <div className="google-map" dangerouslySetInnerHTML={{ __html: map }} />
      <Link
        className="one-tour-order-form-btn"
        href={mapLink}
        style={{
          width: 'unset',
          margin: '40px auto 0',
          textAlign: 'center',
          textDecoration: 'none',
        }}
        target="_blank"
      >
        {t('tour_edit_routes')}
      </Link>
    </div>
  );
};

export default GoogleMap;
