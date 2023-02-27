const inputPlace = document.querySelector('.top-section__input--place');
const btn = document.querySelector('.top-section__submit-btn');
btn.addEventListener('click', handleCreateListHotels);

const fetchHotels = async (search) => {
  const url = new URL('https://if-student-api.onrender.com/api/hotels');
  url.searchParams.append('search', search.trim());
  return fetch(url);
};

async function handleCreateListHotels() {
  document.querySelector('.homes').classList.remove('homes__js');

  try {
    const response = await fetchHotels(inputPlace.value.trim());
    const homesItemsData = await response.json();
    addHomesItems(
      document.getElementById('js-available_hotels'),
      homesItemsData,
    );
  } catch (err) {
    console.log('Fetch Error :-S', err);
  }
}

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

async function renderPopularHotels() {
  const blockEl = document.querySelector('#js-popular-hotels');
  try {
    const response = await fetchHotels('');
    const homesItemsData = await response.json();
    addHomesItems(blockEl, homesItemsData);
  } catch (err) {
    console.log('Fetch Error :-S', err);
  }
}

renderPopularHotels();

// function which change content page (change target nodes: show table with buttons - & + )
function showAdultsForm() {
  const list = document.querySelector('.adults-form');
  list.classList.toggle('adults-form--hidden');
}
// function which change content page (change target nodes: add list of children ages)
function createChildrenList(value) {
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
  for (let i = 1; i <= value; i++) {
    const select = document.createElement('select');
    select.setAttribute('class', 'adults-form__child-age');

    const str = 'years old';
    let strOption = '';

    for (let j = 0; j <= 17; j++) {
      strOption += `<option value="${j}">${j} ${str}</option>`;
    }
    select.innerHTML = strOption;
    childContainer.appendChild(select);
  }
}
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

// object which  is container current state of global main variables
const state = {
  adults: 0,
  children: 0,
  rooms: 0,
  // set  name of variable and run 'list' of changes which will be happened after advent
  set(name, value) {
    this[name] = value;
    this.handleStateUpdate(name);
  },
  // get name of field (variable) which state will be changed
  get(name) {
    return this[name];
  },
  // function which collect list of changes will happen if global variable will be changed
  handleStateUpdate(changedField) {
    const listeners = this.listeners[changedField];
    if (!listeners) {
      return;
    }
    for (const listener of listeners) {
      listener(this[changedField]);
    }
  },

  listeners: {},
  // create of object of listeners. this is collection and meaning of changes which will happen with global variables
  //  contain also which nodes will be used during this process
  addChangeEventListener(field, listener) {
    if (!this.listeners[field]) {
      this.listeners[field] = [];
    }
    this.listeners[field].push(listener);
  },
};

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

  document
    .querySelector(`.top-section__input--${inputNode.dataset.field}`)
    .addEventListener('click', showAdultsForm);

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

state.addChangeEventListener('children', createChildrenList);
