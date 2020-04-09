import createElement from './createElement';

export const controlContainer = createElement('section', 'control');
export const langContainer = createElement('div', 'control__wrapLang');
export const microContainer = createElement('div', 'control__wrapSearch');

export const btnBackground = createElement('button', 'control__backBtn');
export const btnEnglish = createElement('button', 'control__lang', 'control__lang_en');
export const btnRussian = createElement('button', 'control__lang', 'control__lang_ru');
export const btnBelarus = createElement('button', 'control__lang', 'control__lang_be');
export const btnCelsius = createElement(
  'button',
  'control__temperature',
  'control__temperature_celsius'
);
export const btnFahrenheit = createElement(
  'button',
  'control__temperature',
  'control__temperature_fahrenheit'
);

btnEnglish.textContent = 'en';
btnRussian.textContent = 'ru';
btnBelarus.textContent = 'be';

export const btnMicrophone = createElement('button', 'control__microphone');
export const form = createElement('form', 'control__form');
export const input = createElement('input', 'control__search');
input.type = 'text';
export const list = createElement('ul', 'control__list');

export const btnSearch = createElement('button', 'control__searchBtn');
export const error = createElement('div', 'control__error');
btnSearch.textContent = 'Search';

export function appendControl() {
  form.append(input, list);

  langContainer.append(
    btnBackground,
    btnEnglish,
    btnRussian,
    btnBelarus,
    btnCelsius,
    btnFahrenheit
  );

  microContainer.append(btnMicrophone, form, btnSearch);

  controlContainer.append(langContainer, microContainer, error);

  btnCelsius.textContent = '°C';
  btnFahrenheit.textContent = '°F';
}
