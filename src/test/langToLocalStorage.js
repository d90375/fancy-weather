import LS from '../Components/API/LS';

export default function langToLocalStorage(lang) {
  LS.setItem('lang', lang);
}
