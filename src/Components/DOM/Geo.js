import createElement from './createElement';

export const geoContainer = createElement('section', 'geo');
export const geoMap = createElement('div', 'geo__map');
geoMap.id = 'map';

export const geoLoc = createElement('div', 'geo__loc');

export const geoLatitudeContainer = createElement('div', 'geo__latitude-container');
export const geoLatitude = createElement('span', 'geo__latitude');
export const geoLat = createElement('span', 'geo__lat');

export const geoLongitudeContainer = createElement('div', 'geo__longitude-container');
export const geoLongitude = createElement('span', 'geo__longitude');
export const geoLong = createElement('span', 'geo__long');

export function appendGeo() {
  geoLongitudeContainer.append(geoLongitude, geoLong);
  geoLatitudeContainer.append(geoLatitude, geoLat);
  geoLoc.append(geoLongitudeContainer, geoLatitudeContainer);
  geoContainer.append(geoMap, geoLoc);
}
