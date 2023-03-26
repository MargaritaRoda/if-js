import { fetchHotels } from '../api.js';
import filterState from '../filterState.js';
import { bubbleSort } from '../utils.js';
import { POPULAR_HOTELS_KEY } from '../config.js';

function addHomesItems(blockElement, homesItemsData) {
  const containerElement = blockElement.querySelector('.homes__items');
  const nextBtn = blockElement.querySelector('.homes__slider-next');
  nextBtn.style.display = homesItemsData.length <= 4 ? 'none' : 'flex';

  containerElement.innerHTML = '';
  homesItemsData.forEach((item) => {
    const article = document.createElement('article');
    article.innerHTML += `<article class = 'homes__item'>
        <img src="${item.imageUrl}" alt="${item.name}" class="homes__item-img">
        <div class='homes__item-title'>${item.name} </div>
        <div class='homes__item-address'>${item.city} ${item.country}</div>
      </article>`;
    containerElement.appendChild(article);
  });
}

async function getHomesItemsData() {
  const response = await fetchHotels({});
  const homesItemsData = await response.json();
  const sortedHomesItemsData = bubbleSort(homesItemsData, (item1, item2) => {
    const currentName = item1['name'];
    const nextName = item2['name'];
    return currentName.localeCompare(nextName);
  });
  sessionStorage.setItem(
    POPULAR_HOTELS_KEY,
    JSON.stringify(sortedHomesItemsData),
  );
  return sortedHomesItemsData;
}
async function renderPopularHotels() {
  const blockEl = document.querySelector('#js-popular-hotels');

  if (!(POPULAR_HOTELS_KEY in sessionStorage)) {
    try {
      addHomesItems(blockEl, await getHomesItemsData());
    } catch (err) {
      console.log('Fetch Error :-S', err);
    }
  } else {
    let homesItemsData;
    try {
      homesItemsData = JSON.parse(sessionStorage.getItem(POPULAR_HOTELS_KEY));
    } catch (err) {
      try {
        homesItemsData = await getHomesItemsData();
      } catch (err) {
        console.log('Fetch Error :-S', err);
        return;
      }
    }
    addHomesItems(blockEl, homesItemsData);
  }
}

async function render() {
  const inputPlace = document.querySelector('.top-section__input--place');
  const btn = document.querySelector('.top-section__submit-btn');
  btn.addEventListener('click', async () => {
    try {
      const response = await fetchHotels({
        search: inputPlace.value.trim(),
        checkinDate: filterState.get('checkinDate'),
        checkoutDate: filterState.get('checkoutDate'),
        adults: filterState.get('adults'),
        rooms: filterState.get('rooms'),
        childrenAges: filterState.get('childrenAges'),
      });
      const homesItemsData = await response.json();
      addHomesItems(
        document.getElementById('js-available_hotels'),
        homesItemsData,
      );
      document.querySelector('.homes').removeAttribute('hidden');
      const list = document.querySelector('.adults-form');
      list.classList.add('form-panel--hidden');
    } catch (err) {
      console.log('Fetch Error :-S', err);
      document.querySelector('.homes').setAttribute('hidden', '');
    }
    filterState.set('calendarVisible', false);
  });
  await renderPopularHotels();
}

export default render;
