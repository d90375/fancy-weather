import createElement from './createElement';

export const weatherPerThreeContainer = createElement('section', 'weatherPerThree');

export function appendWeatherPerThree() {
  for (let i = 1; i <= 3; i += 1) {
    const w3day = createElement('div', 'weatherPerThree_day', `weatherPerThree_day${i}`);
    const w3week = createElement('span', 'weatherPerThree__week');
    const w3temp = createElement('div', 'weatherPerThree__temperature');

    const w3tempText = createElement('span', 'weatherPerThree__temperature-text');
    const w3tempBadge = createElement('span', 'weatherPerThree__temperature-badge');

    const w3icon = createElement('div', 'weatherPerThree__icon');
    const w3Canvas = createElement('canvas', 'weatherPerThree__canvas');

    w3icon.append(w3Canvas);

    w3temp.append(w3tempText, w3tempBadge);
    w3tempBadge.textContent = '°';

    w3day.append(w3week, w3temp, w3icon);
    weatherPerThreeContainer.append(w3day);
  }
}
