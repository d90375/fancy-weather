import { weatherError as weatherErrorDOM } from '../DOM/WeatherPerDay';

export default function weatherError(lang) {
  weatherErrorDOM.classList.add('display');
  switch (lang) {
    case 'en':
      weatherErrorDOM.textContent = 'The Darksky server response limit, please wait';
      break;
    case 'ru':
      weatherErrorDOM.textContent = 'Предел ответа сервера Darksky, пожалуйста, подождите';
      break;
    case 'be':
      weatherErrorDOM.textContent = 'Ліміт адказу Даркскага сервера, калі ласка, пачакайце';
      break;

    default:
      weatherErrorDOM.textContent = 'The Darksky server response limit, please wait';
  }
  setTimeout(() => {
    weatherErrorDOM.classList.remove('display');
  }, 10000);
}
