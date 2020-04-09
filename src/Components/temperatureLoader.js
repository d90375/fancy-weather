import LS from './API/LS';
import { convertToCelsius, convertToFahrenheit } from './Converters/convertCelsiumFahreneheit';
import { temperature as temperatureDOM, apparent2 as apparent2DOM } from './DOM/WeatherPerDay';
import { weatherPerThreeContainer } from './DOM/WeatherPerThree';

function covertTemp(convertFunc) {
  const weatherPerThreeTemperatureContainer = weatherPerThreeContainer.querySelectorAll(
    '.weatherPerThree__temperature-text'
  );
  temperatureDOM.textContent = convertFunc(temperatureDOM.textContent);
  apparent2DOM.textContent = convertFunc(apparent2DOM.textContent);
  weatherPerThreeTemperatureContainer.forEach(e => {
    // eslint-disable-next-line no-param-reassign
    e.textContent = convertFunc(e.textContent);
  });
}

export default async function temperatureLoader(storageTemp) {
  if (LS.getItem('tempScale') === storageTemp) return;

  if (storageTemp === 'C') {
    covertTemp(convertToCelsius);
  } else {
    covertTemp(convertToFahrenheit);
  }

  LS.setItem('tempScale', storageTemp);
}
