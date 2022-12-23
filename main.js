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
