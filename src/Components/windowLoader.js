import LS from './API/LS';
import Weather from './Class/Weather';
import './DOM/createElement';
import getMap from './API/map';
import WeatherDays from './Class/WeatherDays';
import { addPreloader, removePreloader } from './preloader/preloader';

let intervalId = null;

export default async function windowLoader(lat, long, lang) {
  addPreloader();

  await getMap(long, lat);

  LS.setItem('latitude', lat);
  LS.setItem('longitude', long);
  LS.setItem('lang', lang);

  const weather = new Weather(lat, long, lang);
  await weather.init();
  intervalId = await weather.renderClock(intervalId);

  await weather.renderBackground();

  const weatherDays = new WeatherDays(lat, long, lang);
  await weatherDays.init();
}
