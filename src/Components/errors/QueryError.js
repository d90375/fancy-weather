import { error as errorDOM } from '../DOM/Control';

export default function queryError(lang) {
  errorDOM.classList.add('display');
  switch (lang) {
    case 'en':
      errorDOM.textContent = 'Sorry, invalid query';
      break;
    case 'ru':
      errorDOM.textContent = 'Извинте, неверный запрос';
      break;
    case 'be':
      errorDOM.textContent = 'Прабачце, няправільны запыт';
      break;

    default:
      errorDOM.textContent = 'Sorry, invalid query';
  }
  setTimeout(() => {
    errorDOM.classList.remove('display');
  }, 1500);
}
