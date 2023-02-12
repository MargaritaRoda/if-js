const colors = {
  data: ['magenta', 'cyan', 'firebrick', 'springgreen', 'skyblue'],
  [Symbol.iterator]() {
    const data = this.data;
    return {
      index: 0,

      next() {
        if (this.index >= data.length) {
          this.index = 0;
        }
        return {
          value: data[this.index++],
          done: false,
        };
      },
    };
  },
};

function getChangeColorFn() {
  const iterator = colors[Symbol.iterator]();
  return function changeColor(event) {
    event.target.style.color = iterator.next().value;
  };
}

const text1 = document.getElementById('text1');
const text2 = document.getElementById('text2');
const text3 = document.getElementById('text3');

text1.addEventListener('click', getChangeColorFn());
text2.addEventListener('click', getChangeColorFn());
text3.addEventListener('click', getChangeColorFn());
