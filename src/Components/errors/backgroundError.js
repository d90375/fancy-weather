import { weatherError as weatherErrorDOM } from '../DOM/WeatherPerDay';

export default function backgroundError(lang) {
  weatherErrorDOM.classList.add('display');
  switch (lang) {
    case 'en':
      weatherErrorDOM.textContent = 'The pictures are over(server limit response) please wait  ';
      break;
    case 'ru':
      weatherErrorDOM.textContent =
        'Картинки закончились(лимит ответов сервера) пожалуйста ожидайте перезапуск сервера';
      break;
    case 'be':
      weatherErrorDOM.textContent = 'Карцінкі скончыліся, калі ласка чакайце перазапуск сервера';
      break;

    default:
      weatherErrorDOM.textContent =
        'The pictures are over(ліміт адказаў сервера) please wait for the server to restart';
  }
  setTimeout(() => {
    weatherErrorDOM.classList.remove('display');
  }, 3500);
}
