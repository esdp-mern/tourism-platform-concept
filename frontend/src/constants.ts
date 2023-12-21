export const apiUrl = 'http://localhost:8000';

export enum userRoles {
  admin = 'admin',
  user = 'user',
  guid = 'guid',
  moderator = 'moderator',
}

export const mapMarkerCategories = [
  { src: 'mapMarkers/default-map-marker.svg', type: 'default' },
  { src: 'mapMarkers/hiking-map-marker.svg', type: 'hiking' },
  { src: 'mapMarkers/bus-map-marker.svg', type: 'bus' },
  { src: 'mapMarkers/camera-map-marker.svg', type: 'camera' },
  { src: 'mapMarkers/park-map-marker.svg', type: 'park' },
  { src: 'mapMarkers/hotel-map-marker.svg', type: 'hotel' },
];

export const GOOGLE_CLIENT_ID =
  '302661332601-7q2hnutfbgkh7jlojlkf5flaut32d71q.apps.googleusercontent.com';

export const boardNames = ['booked', 'being considered', 'approved'];
