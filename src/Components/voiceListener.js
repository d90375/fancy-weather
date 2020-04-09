import { getCoordinates } from './API/config';
import { input as inputDOM } from './DOM/Control';
import windowLoader from './windowLoader';
import LS from './API/LS';
import queryError from './errors/QueryError';

export default async function RecognitionHandler(e) {
  const lang = LS.getItem('lang');

  try {
    const { transcript } = e.results[0][0];
    const coordinates = await getCoordinates(transcript);
    const coords = coordinates.results[0].geometry;
    const [lat, long] = [coords.lat, coords.lng];
    if (coordinates) await windowLoader(lat, long, lang);
    LS.setItem('latitude', lat);
    LS.setItem('longitude', long);
    inputDOM.value = transcript;
  } catch (error) {
    queryError();
  }
}
