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

console.log(generateRandomArray());

function replaceZerosToString(arr) {
  console.log('replaceZerosToString: ', arr);
  const newArray = Array(arr.length);
  for (let i = 0; i < arr.length; i += 1) {
    const arrElementAsString = arr[i] + '';
    console.log('arrElementAsString', arrElementAsString);
    const arrElementAsNumbersArray = Array(arrElementAsString.length);
    for (let j = 0; j < arrElementAsNumbersArray.length; j += 1) {
      arrElementAsNumbersArray[j] = arrElementAsString[j];
    }
    console.log('arrElementAsNumbersArray', arrElementAsNumbersArray);

    let hadZeros = false;
    for (let j = 0; j < arrElementAsNumbersArray.length; j += 1) {
      if (arrElementAsNumbersArray[j] === '0') {
        arrElementAsNumbersArray[j] = 'zero';
        hadZeros = true;
      }
    }
    if (hadZeros) {
      console.log('arrElementAsNumbersArray', arrElementAsNumbersArray);
      let newArrayElement = '';
      for (let j = 0; j < arrElementAsNumbersArray.length; j += 1) {
        newArrayElement = newArrayElement + arrElementAsNumbersArray[j];
      }
      console.log(newArrayElement);
      newArray[i] = newArrayElement;
    } else {
      newArray[i] = arr[i];
    }
  }
  return newArray;
}

console.log(replaceZerosToString(generateRandomArray()));
