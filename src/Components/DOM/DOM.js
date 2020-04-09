import { appendControl, controlContainer } from './Control';
import { appendGeo, geoContainer } from './Geo';
import { appendWeatherPerThree, weatherPerThreeContainer } from './WeatherPerThree';
import { appendWeatherPerDay, weatherDayContainer } from './WeatherPerDay';
import createElement from './createElement';

export const wrap = createElement('div', 'wrap');
export default function DOM() {
  document.body.append(wrap);
  appendControl();
  appendGeo();
  appendWeatherPerDay();
  appendWeatherPerThree();

  wrap.append(controlContainer, weatherDayContainer, weatherPerThreeContainer, geoContainer);
}
