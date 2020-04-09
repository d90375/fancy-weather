import LS from '../API/LS';
import dataConverter from '../Converters/dataConverter';
import alphabet from '../Converters/alphabet';
import getTime from '../Converters/getTime';
import { getCity, getImage, getWeather } from '../API/config';

import {
  temperature as temperatureDOM,
  state1 as state1DOM,
  apparent1 as apparent1DOM,
  apparent2 as apparent2DOM,
  speed1 as speed1DOM,
  speed2 as speed2DOM,
  humidity1 as humidity1DOM,
  humidity2 as humidity2DOM,
  iconCanvas as iconCanvasDOM,
  city as cityDOM,
  date as dateDOM,
  hours as hoursDOM,
  minutes as minutesDOM,
  seconds as secondsDOM
} from '../DOM/WeatherPerDay';
import {
  geoLat,
  geoLatitude as geoLatitudeDOM,
  geoLong,
  geoLongitude as geoLongitudeDOM
} from '../DOM/Geo';
import { convertDMSlat, convertDMSlng } from '../Converters/dnsChanger';
import { convertToFahrenheit } from '../Converters/convertCelsiumFahreneheit';
import { btnBelarus, btnEnglish, btnRussian, btnSearch } from '../DOM/Control';
import { removePreloader } from '../preloader/preloader';
import backgroundError from '../errors/backgroundError';
import weatherError from '../errors/weatherError';

const Skycons = require('../../../node_modules/skycons/skycons')(window);

export default class Weather {
  constructor(lat, long, lang) {
    this.lat = lat;
    this.long = long;
    this.lang = lang;
    this.data = {};
    this.countryCity = {};
    this.body = document.querySelector('body');
  }

  async renderLocation() {
    this.countryCity = await getCity(this.lat, this.long, this.lang);
    const {
      country,
      city,
      _type,
      county,
      state,
      town,
      village
    } = this.countryCity.results[0].components;
    const cityFix = city || town || village || county || _type || '';
    const countryFix = country || state || '';
    cityDOM.textContent = `${countryFix}, ${cityFix}`;
  }

  async getWeatherAPI() {
    this.data = await getWeather(this.lat, this.long, this.lang);
  }

  async renderDate() {
    const { time } = this.data.currently;
    const { offset } = this.data;
    const { dayOfWeekShort, day, month } = dataConverter(time, offset, this.lang);
    dateDOM.textContent = ` ${dayOfWeekShort} ${day} ${month}`;
  }

  async updateClock() {
    const time = await getTime(this.data);
    let { hours } = time;
    if (hours < 10) hours = `0${hours}`;
    hoursDOM.textContent = `${hours}:`;

    let { minutes } = time;
    if (minutes < 10) minutes = `0${minutes}`;
    minutesDOM.textContent = `${minutes}:`;

    let { seconds } = time;
    if (seconds < 10) seconds = `0${seconds}`;
    secondsDOM.textContent = seconds;
  }

  async renderClock(id) {
    await this.updateClock.bind(this);
    clearInterval(id);
    return setInterval(await this.updateClock.bind(this), 1000);
  }

  static setTemperature(temperature) {
    return LS.getItem('tempScale') === 'C'
      ? Math.round(temperature)
      : convertToFahrenheit(temperature);
  }

  async renderTemperature() {
    const { temperature } = this.data.currently;
    temperatureDOM.textContent = await Weather.setTemperature(temperature);
  }

  async renderState() {
    const { summary } = this.data.currently;
    state1DOM.textContent = summary;
  }

  async renderApparentTemperature() {
    const { apparentTemperature } = this.data.currently;
    // eslint-disable-next-line prefer-destructuring
    apparent1DOM.textContent = alphabet.static[this.lang][0];
    apparent2DOM.textContent = await Weather.setTemperature(apparentTemperature);
  }

  async renderSpeed() {
    const { currently } = this.data;
    // eslint-disable-next-line prefer-destructuring
    speed1DOM.textContent = alphabet.static[this.lang][1];
    speed2DOM.textContent = ` ${currently.windSpeed.toFixed(1)} ${alphabet.static[this.lang][2]}`;
  }

  async renderHumidity() {
    const { currently } = this.data;
    // eslint-disable-next-line prefer-destructuring
    humidity1DOM.textContent = alphabet.static[this.lang][3];
    humidity2DOM.textContent = ` ${(currently.humidity * 100).toFixed(0)} %`;
  }

  async renderIcon() {
    const { currently } = this.data;
    const icons = new Skycons({ color: 'white' });
    icons.set(iconCanvasDOM, currently.icon);
    icons.play();
  }

  async timeOfDay() {
    const { hours } = await getTime(this.data);
    return hours < 6 || hours > 17 ? 'night' : 'day';
  }

  async timeOfYear() {
    const { time } = this.data.currently;
    const { offset } = this.data;
    const { month } = dataConverter(time, offset, this.lang);
    const monthIndex = alphabet.month.en.indexOf(month);

    switch (true) {
      case monthIndex <= 1:
      case monthIndex === 11:
        return 'Winter';
      case monthIndex <= 4:
        return 'Spring';
      case monthIndex <= 7:
        return 'Summer';
      case monthIndex <= 10:
        return 'Autumn';
      default:
        return 'Winter';
    }
  }

  iconToString() {
    const { icon } = this.data.currently;
    return icon.replace(/-/g, '');
  }

  async renderBackground() {
    try {
      const data = await getImage(
        `${await this.timeOfYear()}-${await this.timeOfDay()}-${await this.iconToString()}`
      );
      const img = data.urls.regular;
      this.body.style.background = `url('${img}') no-repeat center center`;
      this.body.style.backgroundAttachment = 'fixed';
      this.body.style.backgroundSize = 'cover';
      removePreloader();
    } catch (e) {
      removePreloader();
      backgroundError(this.lang);
    }
  }

  async renderGeoCoordinates() {
    // eslint-disable-next-line prefer-destructuring
    geoLatitudeDOM.textContent = `${alphabet.static[this.lang][4]} `;
    // eslint-disable-next-line prefer-destructuring
    geoLongitudeDOM.textContent = `${alphabet.static[this.lang][5]} `;
    geoLat.textContent = convertDMSlat(this.lat);
    geoLong.textContent = convertDMSlng(this.long);
  }

  buttonTranslate() {
    // eslint-disable-next-line prefer-destructuring
    btnSearch.textContent = alphabet.static[this.lang][6];
    // eslint-disable-next-line prefer-destructuring
    btnEnglish.textContent = alphabet.static[this.lang][7];
    // eslint-disable-next-line prefer-destructuring
    btnRussian.textContent = alphabet.static[this.lang][8];
    // eslint-disable-next-line prefer-destructuring
    btnBelarus.textContent = alphabet.static[this.lang][9];
  }

  async init() {
    try {
      await this.getWeatherAPI();
      await this.renderDate();
      await this.renderLocation();
      await this.renderTemperature();
      await this.renderState();
      await this.renderApparentTemperature();
      await this.renderSpeed();
      await this.renderHumidity();
      await this.renderIcon();
      await this.renderGeoCoordinates();
      this.buttonTranslate();
    } catch (e) {
      removePreloader();
      weatherError(this.lang);
    }
  }
}
