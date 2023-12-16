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
    routes.forEach((route) => {
      const routeCoordinates = route.map((point) => {
        const coordinates = point.coordinates.split(',') as string[];
        return {
          lat: parseFloat(coordinates[0]),
          lng: parseFloat(coordinates[1]),
        };
      });

      route.forEach((point) => {
        new maps.Marker({
          position: {
            lat: parseFloat(point.coordinates.split(',')[0]),
            lng: parseFloat(point.coordinates.split(',')[1]),
          },
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
        path: routeCoordinates,
        geodesic: true,
        strokeColor: route[0].strokeColor || '#FF0000', // Default to red if strokeColor is missing
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
