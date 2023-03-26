import filterState from '../filterState.js';

function updateCounterForm({
  numberSelector,
  minusBtnSelector,
  plusBtnSelector,
  input,
  min,
  max,
}) {
  const number = document.querySelector(numberSelector);
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

function render() {
  for (const inputNode of document.querySelectorAll(
    '.js-top-section-counter',
  )) {
    document
      .querySelector(`.${inputNode.dataset.field}-btn--minus`)
      .addEventListener('click', (event) => {
        event.preventDefault();
        filterState.set(
          inputNode.dataset.field,
          filterState.get(inputNode.dataset.field) - 1,
        );
      });
    document
      .querySelector(`.${inputNode.dataset.field}-btn--plus`)
      .addEventListener('click', (event) => {
        event.preventDefault();
        filterState.set(
          inputNode.dataset.field,
          filterState.get(inputNode.dataset.field) + 1,
        );
      });
    inputNode.addEventListener('click', () => {
      const list = document.querySelector('.adults-form');
      list.classList.toggle('form-panel--hidden');
    });

    filterState.addChangeEventListener(
      inputNode.dataset.field,
      updateCounterForm({
        numberSelector: `.adults-form__number-${inputNode.dataset.field}`,
        minusBtnSelector: `.${inputNode.dataset.field}-btn--minus`,
        plusBtnSelector: `.${inputNode.dataset.field}-btn--plus`,
        input: inputNode,
        min: parseInt(inputNode.dataset.min, 10),
        max: parseInt(inputNode.dataset.max, 10),
      }),
    );
  }

  filterState.addChangeEventListener('children', (value) => {
    filterState.set(
      'childrenAges',
      filterState
        .get('childrenAges') // change
        .slice(0, value)
        .map((val) => {
          if (val === undefined) {
            return 0;
          }
          return val;
        }),
    );

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

    const childrenAges = filterState.get('childrenAges');

    for (let i = 1; i <= value; i++) {
      const select = document.createElement('select');

      select.addEventListener('change', (event) => {
        const childrenAges = filterState.get('childrenAges');
        childrenAges[i - 1] = parseInt(event.target.value, 10);
        filterState.set('childrenAges', childrenAges);
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
}

export default render;
