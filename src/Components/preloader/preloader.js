import { wrap as wrapDOM } from '../DOM/DOM';

const preloaderDOM = document.getElementById('spin-wrapper');

export function addPreloader() {
  setTimeout(() => {
    if (preloaderDOM.classList.contains('done')) {
      wrapDOM.classList.remove('done');
      preloaderDOM.classList.remove('done');
    }
  }, 100);
}
export function removePreloader() {
  wrapDOM.classList.add('done');
  preloaderDOM.classList.add('done');
}

