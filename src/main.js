let user = 'John Doe';
console.log(user);

const student = 'Margarita';
console.log(student);

user = student;
/*Expected user = Margarita*/
console.log(user);

let test = 1;
test += 1;
test = test - '1';
/*Expected test = 1*/
console.log(test);

test -= 1;
//Expected test 0
console.log(test);

test = !!test;
//Expected test false
console.log(test);

console.log('------------');

const arr = [2, 3, 5, 8];
let result = arr[0];

for (let i = 1; i < arr.length; i++) {
  result *= arr[i];
}
console.log(result);

console.log('------------');

const array = [2, 5, 8, 15, 0, 6, 20, 3];

for (let n = 0; n < array.length; n++) {
  if (array[n] > 5 && array[n] < 10) console.log(array[n]);
}

console.log('------------');

for (let n = 0; n < array.length; n++) {
  if (array[n] % 2 === 0 && array[n] !== 0) {
    console.log(array[n]);
  }
}

function pal(input) {
  const n = input.length - 1;

  for (let i = 0; i < n - i; i += 1) {
    if (input[i] !== input[n - i]) {
      return false;
    }
  }
  return true;
}
const words = ['12321', '1221', 'fwef'];

for (let i = 0; i < words.length; i += 1) {
  if (pal(words[i])) {
    console.log(words[i] + ' is palindrome');
  } else {
    console.log(words[i] + ' is not a palindrome');
  }
}
function min(a, b) {
  if (a < b) {
    return a;
  }
  return b;
}

console.log(min(2, 4));
console.log(min(200, 40));

const max = function (a, y) {
  return a > y ? a : y;
};

console.log(max(3, 6));

function generateRandomArray() {
  const arr = Array(10);
  const max = 100;

  for (let i = 0; i < arr.length; i += 1) {
    arr[i] = Math.round(Math.random() * max);
  }
  return arr;
}

// console.log(generateRandomArray());

function replaceZerosToString(arr) {
  const newarr = Array(arr.length);
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i] === 100) {
      newarr[i] = '1zerozero';
    } else if (arr[i] % 10 === 0) {
      newarr[i] = arr[i] / 10 + 'zero';
    } else {
      newarr[i] = arr[i];
    }
  }
  return newarr;
}

const a = generateRandomArray();
const b = replaceZerosToString(a);
console.log(a);
console.log(b);
