import { input as inputDOM, list as listDOM } from './DOM/Control';
import { getCoordinates } from './API/config';
import windowLoader from './windowLoader';
import LS from './API/LS';
import createElement from './DOM/createElement';
import QueryError from './errors/QueryError';

export default async function initInput() {
  const lang = LS.getItem('lang');
  const city = inputDOM.value;

  try {
    let lat = 0;
    let long = 0;
    let data = null;

    if (!city) return;
    if (listDOM.childNodes.length !== 0) return;

    // get coordinates by city query
    data = await getCoordinates(city, lang);

    // Incorrect query symbol, such a city does not exist
    if (data.results.length === 0) {
      throw new QueryError(lang);
    }

    // Create list
    data.results.forEach((e, index) => {
      const itemDOM = createElement('li', 'control__item', `control__item-${index}`);
      listDOM.append(itemDOM);
      itemDOM.id = index;
      itemDOM.textContent = e.formatted;
    });

    // Listen click on list
    listDOM.addEventListener(
      'click',
      async e => {
        const coordsResult = data.results[e.target.id].geometry;

        lat = coordsResult.lat;

        long = coordsResult.lng;

        await windowLoader(lat, long, lang);

        while (listDOM.firstChild) {
          listDOM.removeChild(listDOM.firstChild);
        }
      },
      { once: true }
    );

    // If list mouseout then collapse
    listDOM.addEventListener('mouseleave', () => {
      listDOM.classList.remove('display');
    });

    // Input list mouseover open
    inputDOM.addEventListener('mouseover', () => {
      listDOM.classList.add('display');
    });
    if (!listDOM.classList.contains('display')) listDOM.classList.add('display');

    LS.setItem('latitude', lat);
    LS.setItem('longitude', long);
  } catch (e) {
    QueryError(lang);
  }
}
