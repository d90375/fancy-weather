import Weather from './Class/Weather';
import LS from './API/LS';
import WeatherDays from './Class/WeatherDays';

export default async function translateLoader(lang) {
  if (LS.getItem('lang') === lang) return;
  const lat = LS.getItem('latitude');
  const long = LS.getItem('longitude');

  const weather = new Weather(lat, long, lang);
  weather.buttonTranslate();
  await weather.getWeatherAPI();
  await weather.renderLocation();
  await weather.renderDate();
  await weather.renderState();
  await weather.renderApparentTemperature();
  await weather.renderSpeed();
  await weather.renderHumidity();
  await weather.renderGeoCoordinates();

  const weatherDays = new WeatherDays(lat, long, lang);
  await weatherDays.getWeatherAPI();
  await weatherDays.getWeekDay();
}
