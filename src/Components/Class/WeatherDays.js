import { getWeather } from '../API/config';
import dataConverter from '../Converters/dataConverter';
import { weatherPerThreeContainer as weatherPerThreeContainerDOM } from '../DOM/WeatherPerThree';
import Weather from './Weather';
import LS from '../API/LS';
import { convertToFahrenheit } from '../Converters/convertCelsiumFahreneheit';
import { removePreloader } from '../preloader/preloader';
import weatherError from '../errors/weatherError';

const Skycons = require('../../../node_modules/skycons/skycons')(window);

export default class WeatherDays extends Weather {
  constructor(lat, long, lang, temperatureScale) {
    super(lat, long, lang, temperatureScale);

    this.weatherPerThreeWeekContainer = weatherPerThreeContainerDOM.querySelectorAll(
      '.weatherPerThree__week'
    );
    this.weatherPerThreeTemperatureContainer = weatherPerThreeContainerDOM.querySelectorAll(
      '.weatherPerThree__temperature-text'
    );
    this.weatherPerThreeIconContainer = weatherPerThreeContainerDOM.querySelectorAll(
      '.weatherPerThree__canvas'
    );
  }

  async getWeatherAPI() {
    this.data = await getWeather(this.lat, this.long, this.lang);
  }

  async getTemperature() {
    this.weatherPerThreeTemperatureContainer.forEach((selector, index) => {
      const { temperatureMax, temperatureMin } = this.data.daily.data[index + 1];
      const temperatureAverage = (temperatureMax + temperatureMin) / 2;
      // eslint-disable-next-line no-param-reassign
      selector.textContent =
        LS.getItem('tempScale') === 'C'
          ? Math.round(temperatureAverage)
          : convertToFahrenheit(temperatureAverage);
    });
  }

  getIcon() {
    this.weatherPerThreeIconContainer.forEach((selector, index) => {
      const { icon } = this.data.daily.data[index + 1];

      const icons = new Skycons({ color: 'white' });
      icons.set(selector, icon);

      icons.play();
    });
  }

  async getWeekDay() {
    this.weatherPerThreeWeekContainer.forEach((selector, index) => {
      const { time } = this.data.daily.data[index + 1];
      const { offset } = this.data;
      // eslint-disable-next-line no-param-reassign
      selector.textContent = dataConverter(time, offset, this.lang).dayOfWeek;
    });
  }

  async init() {
    try {
      await this.getWeatherAPI();
      await this.getTemperature();
      this.getIcon();
      await this.getWeekDay();
    } catch (e) {
      removePreloader();
      weatherError(this.lang);
    }
  }
}
