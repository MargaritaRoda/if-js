import state from '../state.js';

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

function render() {
  for (const inputNode of document.querySelectorAll(
    '.js-top-section-counter',
  )) {
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
    state.set(
      'childrenAges',
      state
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
}

export default render;
