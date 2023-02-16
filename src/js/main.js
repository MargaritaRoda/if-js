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

document
  .querySelector('.top-section__input--adult')
  .addEventListener('click', showAdultsForm);
document
  .querySelector('.top-section__input--child')
  .addEventListener('click', showAdultsForm);
document
  .querySelector('.top-section__input--room')
  .addEventListener('click', showAdultsForm);

function showAdultsForm() {
  const list = document.querySelector('.adults-form');
  list.classList.toggle('adults-form--hidden');
}

function makeMinusListener(
  numberSelector,
  plusBtnSelector,
  min,
  max,
  inputSelector,
) {
  const number = document.querySelector(numberSelector);
  const input = document.querySelector(inputSelector);
  const plusBtn = document.querySelector(plusBtnSelector);
  return function (event) {
    event.preventDefault();
    let value = parseInt(number.textContent, 10);

    if (value === max) {
      plusBtn.removeAttribute('disabled');
    }

    value -= 1;
    number.textContent = value;
    if (value === min) {
      event.target.setAttribute('disabled', '');
    }

    input.value = `${value} ${input.dataset.prefix}`;
  };
}
function makePlusListener(
  numberSelector,
  minusBtnSelector,
  min,
  max,
  inputSelector,
) {
  const number = document.querySelector(numberSelector);
  const input = document.querySelector(inputSelector);
  const minusBtn = document.querySelector(minusBtnSelector);
  return function (event) {
    event.preventDefault();
    let value = parseInt(number.textContent, 10);
    if (value === min) {
      minusBtn.removeAttribute('disabled');
    }
    value += 1;
    number.textContent = value;
    if (value === max) {
      event.target.setAttribute('disabled', '');
    }

    input.value = `${value} ${input.dataset.prefix}`;
  };
}

document
  .querySelector('.adults-btn--minus')
  .addEventListener(
    'click',
    makeMinusListener(
      '.adults-form__number-adult',
      '.adults-btn--plus',
      0,
      30,
      '.top-section__input--adult',
    ),
  );
document
  .querySelector('.adults-btn--plus')
  .addEventListener(
    'click',
    makePlusListener(
      '.adults-form__number-adult',
      '.adults-btn--minus',
      0,
      30,
      '.top-section__input--adult',
    ),
  );
document
  .querySelector('.children-btn--minus')
  .addEventListener(
    'click',
    makeMinusListener(
      '.adults-form__number-children',
      '.children-btn--plus',
      0,
      10,
      '.top-section__input--child',
    ),
  );
document
  .querySelector('.children-btn--plus')
  .addEventListener(
    'click',
    makePlusListener(
      '.adults-form__number-children',
      '.children-btn--minus',
      0,
      10,
      '.top-section__input--child',
    ),
  );
document
  .querySelector('.room-btn--minus')
  .addEventListener(
    'click',
    makeMinusListener(
      '.adults-form__number-room',
      '.room-btn--plus',
      0,
      30,
      '.top-section__input--room',
    ),
  );
document
  .querySelector('.room-btn--plus')
  .addEventListener(
    'click',
    makePlusListener(
      '.adults-form__number-room',
      '.room-btn--minus',
      0,
      30,
      '.top-section__input--room',
    ),
  );

document
  .querySelector('.children-btn--plus')
  .addEventListener('click', handleChildrenButtonsClick);
document
  .querySelector('.children-btn--minus')
  .addEventListener('click', handleChildrenButtonsClick);
function handleChildrenButtonsClick() {
  const numberOfChildren = document.querySelector(
    '.adults-form__number-children',
  );
  const value = parseInt(numberOfChildren.textContent, 10);
  createChildrenList(value);
}

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
