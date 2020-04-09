import Weather from './Class/Weather';
import LS from './API/LS';

export default async function backgroundLoader(lang) {
  const lat = LS.getItem('latitude');
  const long = LS.getItem('longitude');
  const weather = new Weather(lat, long, lang);
  await weather.getWeatherAPI();
  await weather.renderLocation();
  await weather.renderBackground();
}
