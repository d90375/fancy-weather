import backgroundError from '../errors/backgroundError';
import { removePreloader } from '../preloader/preloader';

const openCageKey = '36ee6241a1644755a4a13670e9d9d9a0';
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const unsplashKey = 'f0a68ee24cd33cda061246a3259fd92d19c7c01951197dde47e7c9e2ab76898d';
const ipKey = '8157f79df2f896';
const darkSkyKey = '89c1789e107ef1e54251cb480fb6e8cd';

async function JSONparser(url) {
  const response = await fetch(url);

  const data = await response.json();
  return data;
}

export function getCoordinates(query, lang) {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${openCageKey}&language=${lang}&pretty=1&no_annotations=1`;
  return JSONparser(url);
}

export function getCity(lat, long, lang) {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}%2C%20${long}&key=${openCageKey}&language=${lang}&pretty=1&no_annotations=1`;

  return JSONparser(url);
}

export function getImage(query) {
  const url = `https://api.unsplash.com/photos/random?query=${query}&client_id=${unsplashKey}`;
  return JSONparser(url);
}

export function getIP() {
  const url = `https://ipinfo.io/json?token=${ipKey}`;

  return JSONparser(url);
}

export function getWeather(lat, long, lang) {
  const url = `https://api.darksky.net/forecast/${darkSkyKey}/${lat},${long}?units=si&lang=${lang}`;
  return JSONparser(proxyUrl + url);
}
