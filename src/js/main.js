const homesItemsData = [
  {
    id: '71ce9eac-e9b9-44f0-a342-9ff0b565f3b7',
    name: 'Hotel Leopold',
    city: 'Saint Petersburg',
    country: 'Russia',
    imageUrl:
      'https://res.cloudinary.com/intellectfox/image/upload/v1610379365/fe/hotel-leopold_mflelk.jpg',
  },
  {
    id: 'aa560608-a879-48a7-80b6-deff2806b250',
    name: 'Apartment Sunshine',
    city: 'Santa  Cruz de Tenerife',
    country: 'Spain',
    imageUrl:
      'https://res.cloudinary.com/intellectfox/image/upload/v1610379364/fe/apartment-sunshine_vhdlel.jpg',
  },
  {
    id: '1d88fefe-edf1-4cda-844a-babbf29bb2b3',
    name: 'Villa Kunerad',
    city: 'Vysokie Tatry',
    country: 'Slowakia',
    imageUrl:
      'https://res.cloudinary.com/intellectfox/image/upload/v1610379365/fe/villa-kunerad_gdbqgv.jpg',
  },
  {
    id: 'a2bf824d-edd8-41f0-8b70-244334086ab4',
    name: 'Hostel Friendship',
    city: 'Berlin',
    country: 'Germany',
    imageUrl:
      'https://res.cloudinary.com/intellectfox/image/upload/v1610379364/fe/hostel-friendship_aw6tn7.jpg',
  },
  {
    id: '4024535d-a498-4274-b7cb-f01ada962971',
    name: 'Radisson Blu Hotel',
    city: 'Kyiv',
    country: 'Ukraine',
    imageUrl:
      'https://res.cloudinary.com/intellectfox/image/upload/v1610379365/fe/radisson-blu-hotel_jwtowg.jpg',
  },
  {
    id: 'e51e71f6-6baf-4493-b3ae-25dc27cdc238',
    name: 'Paradise Hotel',
    city: 'Guadalupe',
    country: 'Mexico',
    imageUrl:
      'https://res.cloudinary.com/intellectfox/image/upload/v1610379365/fe/paradise-hotel_i6whae.jpg',
  },
  {
    id: '87d2b966-2431-43f3-8c0d-2c8723474dfc',
    name: 'Hotel Grindewald',
    city: 'Interlaken',
    country: 'Switzerland',
    imageUrl:
      'https://res.cloudinary.com/intellectfox/image/upload/v1610379365/fe/hotel-grindewald_zsjsmy.jpg',
  },
  {
    id: '190221c6-b18f-4dba-97de-e35f0e14c023',
    name: 'The Andaman Resort',
    city: 'Port Dickson',
    country: 'Malaysia',
    imageUrl:
      'https://res.cloudinary.com/intellectfox/image/upload/v1610379365/fe/the-andaman-resort_d2xksj.jpg',
  },
];

function addHomesItems(containerElement, homesItemsData) {
  homesItemsData.forEach((item) => {
    const article = document.createElement('article');
    article.innerHTML += `<article class = 'homes__item'>
        <img src=${item.imageUrl} alt = ${item.name} class='homes__item-img'>
        <div class='homes__item-title'>${item.name} </div>
        <div class='homes__item-address'>${item.city} ${item.country}</div>
      </article>`;
    containerElement.appendChild(article);
  });
}

addHomesItems(document.querySelector('.homes__items'), homesItemsData);

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
