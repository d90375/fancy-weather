import createElement from './createElement';

export const weatherDayContainer = createElement('section', 'weatherPerDay');
export const weatherError = createElement('div', 'weatherPerDay__error');
export const locContainer = createElement('div', 'weatherPerDay__wrapLoc');
export const dateContainer = createElement('div', 'weatherPerDay__wrapDate');
export const city = createElement('span', 'weatherPerDay__timezone');
export const date = createElement('span', 'weatherPerDay__date');

export const clockContainer = createElement('div', 'weatherPerDay__clock');
export const hours = createElement('span', 'weatherPerDay__clock_hour');
export const minutes = createElement('span', 'weatherPerDay__clock_minutes');
export const seconds = createElement('span', 'weatherPerDay__clock_second');

export const weatherContainer = createElement('div', 'weatherPerDay__wrapWeather');

export const icon = createElement('div', 'weatherPerDay__icon');
export const iconCanvas = createElement('canvas', 'weatherPerDay__canvas');

export const temperatureContainer = createElement('div', 'weatherPerDay__temperature-container');
export const temperature = createElement('span', 'weatherPerDay__temperature');
export const temperatureBadge = createElement('span', 'weatherPerDay__temperature-badge');
temperatureBadge.textContent = '°';

export const summaryContainer = createElement('div', 'weatherPerDay__summary');

export const stateContainer = createElement('div', 'weatherPerDay__state');
export const state1 = createElement('span', 'weatherPerDay__state1');
export const apparentContainer = createElement('div', 'weatherPerDay__apparent');
export const apparent1 = createElement('span', 'weatherPerDay__apparent1');
export const apparent2container = createElement('div', 'weatherPerDay__apparent2-container');
export const apparent2 = createElement('span', 'weatherPerDay__apparent2');
export const apparent2badge = createElement('span', 'weatherPerDay__apparent-badge');
apparent2badge.textContent = '°';

export const speedContainer = createElement('div', 'weatherPerDay__speed');
export const speed1 = createElement('span', 'weatherPerDay__speed1');
export const speed2 = createElement('span', 'weatherPerDay__speed2');
export const humidityContainer = createElement('div', 'weatherPerDay__humidity');
export const humidity1 = createElement('span', 'weatherPerDay__humidity1');
export const humidity2 = createElement('span', 'weatherPerDay__humidity2');

export function appendWeatherPerDay() {
  dateContainer.append(city, date);

  clockContainer.append(hours, minutes, seconds);

  locContainer.append(dateContainer, clockContainer);

  apparent2container.append(apparent2, apparent2badge);

  stateContainer.append(state1);
  apparentContainer.append(apparent1, apparent2container);
  speedContainer.append(speed1, speed2);
  humidityContainer.append(humidity1, humidity2);

  summaryContainer.append(stateContainer, apparentContainer, speedContainer, humidityContainer);
  icon.append(iconCanvas);
  temperatureContainer.append(temperature, temperatureBadge);

  weatherContainer.append(temperatureContainer, icon, summaryContainer);

  weatherDayContainer.append(locContainer, weatherContainer, weatherError);

  apparent1.textContent = 'fells like:';
  speed1.textContent = 'wind:';
  humidity1.textContent = 'humidity:';
}
