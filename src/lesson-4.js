function sum(x) {
  return function (y) {
    return x + y;
  };
}
console.log(sum(5)(2));

const colors = ['magenta', 'cyan', 'firebrick', 'springgreen', 'skyblue'];
const text1 = document.getElementById('text1');
const text2 = document.getElementById('text2');
const text3 = document.getElementById('text3');

function getChangeColorFn() {
  let i = 0;
  return function changeColor(event) {
    event.target.style.color = colors[i];
    i += 1;
    if (i === colors.length) {
      i = 0;
    }
  };
}

text1.addEventListener('click', getChangeColorFn());
text2.addEventListener('click', getChangeColorFn());
text3.addEventListener('click', getChangeColorFn());
