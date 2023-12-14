import React from 'react';
import GoogleMapReact from 'google-map-react';
import { apiUrl } from '@/constants';
import { ITourRoute } from '@/type';

interface IProps {
  width: string;
  height: string;
  routes: ITourRoute[][];
}

const GoogleMap: React.FC<IProps> = ({ width, height, routes }) => {
  const handleApiLoaded = (map: any, maps: any) => {
    new maps.Marker({
      position: { lat: 42.846362, lng: 74.597243 },
      map,
      title: 'Attractor School',
    });

    let routeWithMarkers = routes as ITourRoute[][];

    routeWithMarkers.forEach((route) => {
      route.forEach((point) => {
        new maps.Marker({
          position: { lat: point.lat, lng: point.lng },
          map,
          title: point.title,
          icon: {
            url:
              apiUrl + '/' + (point.icon || 'fixtures/default-map-marker.svg'),
            scaledSize: new maps.Size(25, 25),
          },
        });
      });

      const roadPath = new maps.Polyline({
        path: route,
        geodesic: true,
        strokeColor: route[0].strokeColor,
        strokeOpacity: 1.0,
        strokeWeight: 5,
      });

      roadPath.setMap(map);
    });
  };

  return (
    <div style={{ height: height, width: width, marginTop: '50px' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDFl0Ww1q9QHPiGn_RiQ6ps8Lr5Yb4TtT8' }}
        defaultCenter={{
          lat: 41.357104,
          lng: 74.386171,
        }}
        defaultZoom={7}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      />
    </div>
  );
};

export default GoogleMap;
