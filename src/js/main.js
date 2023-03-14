import { bubbleSort } from './utils.js';
import state from './state.js';

const API_HOTELS_URL = 'https://if-student-api.onrender.com/api/hotels';
const POPULAR_HOTELS_KEY = 'popularHotels';

async function fetchHotels({
  search = '',
  adults = 0,
  childrenAges = [],
  rooms = 0,
}) {
  const url = new URL(API_HOTELS_URL);
  if (adults > 0) {
    url.searchParams.append('adults', adults.toString());
    if (childrenAges.length > 0) {
      url.searchParams.append('children', childrenAges.join(','));
    }
    url.searchParams.append('rooms', rooms.toString());
  }
  url.searchParams.append('search', search.trim());
  return fetch(url);
}

const inputPlace = document.querySelector('.top-section__input--place');
const btn = document.querySelector('.top-section__submit-btn');
btn.addEventListener('click', async () => {
  try {
    const response = await fetchHotels({
      search: inputPlace.value.trim(),
      adults: state.get('adults'),
      rooms: state.get('rooms'),
      childrenAges: state
        .get('childrenAges')
        .filter((age) => Number.isInteger(age)),
    });
    const homesItemsData = await response.json();
    addHomesItems(
      document.getElementById('js-available_hotels'),
      homesItemsData,
    );
    document.querySelector('.homes').removeAttribute('hidden');
  } catch (err) {
    console.log('Fetch Error :-S', err);
    document.querySelector('.homes').setAttribute('hidden', '');
  }
});

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
      }
    }

    addHomesItems(blockEl, homesItemsData);
  }
}

renderPopularHotels();

// function which change content page (change target nodes: show table with buttons - & + )

// function which change content page (change target nodes: change value after button click)
function updateCounterForm({
  numberSelector,
  minusBtnSelector,
  plusBtnSelector,
  inputSelector,
  min,
  max,
}) {
  const number = document.querySelector(numberSelector);
  const input = document.querySelector(inputSelector);
  const minusBtn = document.querySelector(minusBtnSelector);
  const plusBtn = document.querySelector(plusBtnSelector);

  return function (value) {
    if (value === min) {
      minusBtn.setAttribute('disabled', '');
    } else {
      minusBtn.removeAttribute('disabled');
    }
    number.textContent = value;
    if (value === max) {
      plusBtn.setAttribute('disabled', '');
    } else {
      plusBtn.removeAttribute('disabled');
    }
    input.value = `${value} ${input.dataset.prefix}`;
  };
}

for (const inputNode of document.querySelectorAll('.js-top-section-counter')) {
  document
    .querySelector(`.${inputNode.dataset.field}-btn--minus`)
    .addEventListener('click', (event) => {
      event.preventDefault();
      state.set(
        inputNode.dataset.field,
        state.get(inputNode.dataset.field) - 1,
      );
    });
  document
    .querySelector(`.${inputNode.dataset.field}-btn--plus`)
    .addEventListener('click', (event) => {
      event.preventDefault();
      state.set(
        inputNode.dataset.field,
        state.get(inputNode.dataset.field) + 1,
      );
    });
  inputNode.addEventListener('click', () => {
    const list = document.querySelector('.adults-form');
    list.classList.toggle('adults-form--hidden');
  });

  state.addChangeEventListener(
    inputNode.dataset.field,
    updateCounterForm({
      numberSelector: `.adults-form__number-${inputNode.dataset.field}`,
      minusBtnSelector: `.${inputNode.dataset.field}-btn--minus`,
      plusBtnSelector: `.${inputNode.dataset.field}-btn--plus`,
      inputSelector: `.top-section__input--${inputNode.dataset.field}`,
      min: parseInt(inputNode.dataset.min, 10),
      max: parseInt(inputNode.dataset.max, 10),
    }),
  );
}

state.addChangeEventListener('children', (value) => {
  state.set('childrenAges', state.get('childrenAges').slice(0, value));

  const adultsFormChildren = document.querySelector('.adults-form__children');
  if (value !== 0) {
    adultsFormChildren.classList.remove('adults-form__children--hidden');
  } else {
    adultsFormChildren.classList.add('adults-form__children--hidden');
  }

  const childContainer = document.querySelector(
    '.adults-form__children-container',
  );
  childContainer.innerHTML = '';

  const childrenAges = state.get('childrenAges');

  for (let i = 1; i <= value; i++) {
    const select = document.createElement('select');

    select.addEventListener('change', (event) => {
      const childrenAges = state.get('childrenAges');
      childrenAges[i - 1] = parseInt(event.target.value, 10);
      state.set('childrenAges', childrenAges);
    });

    select.setAttribute('class', 'adults-form__child-age');

    const str = 'years old';
    let strOption = '';

    for (let j = 0; j <= 17; j++) {
      strOption += `<option value="${j}">${j} ${str}</option>`;
    }
    select.innerHTML = strOption;
    if (childrenAges[i - 1]) {
      select.value = childrenAges[i - 1].toString();
    }
    childContainer.appendChild(select);
  }
});
