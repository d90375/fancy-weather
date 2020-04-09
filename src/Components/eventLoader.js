import windowLoader from './windowLoader';
import {
  btnBackground,
  btnBelarus,
  btnCelsius,
  btnEnglish,
  btnFahrenheit,
  btnMicrophone as btnMicrophoneDOM,
  btnRussian,
  btnSearch
} from './DOM/Control';
import initInput from './clickLoader';
import { getIP } from './API/config';
import DOM from './DOM/DOM';
import translateLoader from './translateLoader';
import LS from './API/LS';
import backgroundLoader from './backgroundLoader';
import temperatureLoader from './temperatureLoader';
import RecognitionHandler from './voiceListener';

export default async function eventLoader() {
  // First load settings

  const lang = LS.getItem('lang') === null ? 'en' : LS.getItem('lang');

  switch (lang) {
    case 'ru':
      btnRussian.classList.add('active');
      break;
    case 'be':
      btnBelarus.classList.add('active');
      break;
    default:
      btnEnglish.classList.add('active');

      localStorage.setItem('lang', 'en');
      break;
  }

  if (LS.getItem('tempScale') === 'F') {
    btnFahrenheit.classList.add('active');
  } else {
    btnCelsius.classList.add('active');
    LS.setItem('tempScale', 'C');
  }

  // Construction Document Object Model

  DOM();

  // Get IP location for first load
  const location = await getIP();
  const loc = location.loc.split(',').map(e => +e);
  const [lat, long] = loc;

  // Recognition loader

  window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = lang;

  let recognize = false;

  btnMicrophoneDOM.addEventListener('click', () => {
    if (!recognize) recognition.start();
  });

  recognition.addEventListener('start', () => {
    recognize = true;
    btnMicrophoneDOM.classList.add('actively');
  });

  recognition.addEventListener('end', () => {
    recognize = false;
    btnMicrophoneDOM.classList.remove('actively');
  });

  recognition.addEventListener('result', RecognitionHandler);

  // Listen to the event for Translate

  const btnContainer = [btnRussian, btnBelarus, btnEnglish];
  btnRussian.addEventListener('click', () => {
    translateLoader('ru');
    LS.setItem('lang', 'ru');
    btnContainer.forEach(e => {
      e.classList.remove('active');
    });
    btnRussian.classList.add('active');
    recognition.lang = 'ru';
  });

  btnEnglish.addEventListener('click', () => {
    translateLoader('en');
    LS.setItem('lang', 'en');
    btnContainer.forEach(e => {
      e.classList.remove('active');
    });
    btnEnglish.classList.add('active');
    recognition.lang = 'en';
  });

  btnBelarus.addEventListener('click', () => {
    translateLoader('be');
    LS.setItem('lang', 'be');
    btnContainer.forEach(e => {
      e.classList.remove('active');
    });
    btnBelarus.classList.add('active');
    recognition.lang = 'be';
  });

  // Listen to the event for Temperature scale

  btnCelsius.addEventListener('click', () => {
    temperatureLoader('C');
    btnCelsius.classList.add('active');
    btnFahrenheit.classList.remove('active');
  });
  btnFahrenheit.addEventListener('click', () => {
    temperatureLoader('F');
    btnFahrenheit.classList.add('active');
    btnCelsius.classList.remove('active');
  });

  // Listen to the event for Search
  btnSearch.addEventListener('click', () => {
    initInput(lang);
  });

  document.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      btnSearch.click();
    }
  });

  // Draw values on DOM elements

  window.addEventListener('load', windowLoader(lat, long, lang));

  // Draw background image
  btnBackground.addEventListener('click', () => {
    backgroundLoader('en');
  });
}
