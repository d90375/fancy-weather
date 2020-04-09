import LS from '../Components/API/LS';

export default function coordinateLocalStorage(lat, long) {
  LS.setItem('latitude', lat);
  LS.setItem('longitude', long);
}
