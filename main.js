let user = 'John Doe';
console.log(user);

const student = 'Margarita';
console.log(student);

user = student;
/*Поскольку переменная let, то она будет переопределяться по ходу кода.
Поэтому будет отбражаться уже новое имя Margarita*/
console.log(user);

let test = 1;
test += 1;
test = test - '1';
/*Поскольку по правилам приведения типов в js при вычитании number и string,
все приводится к типу number, в ответе будет число 1*/
console.log(test);

test -= 1;
//По правилам приведения типов бинарные оператор с двумя типами number дают number, поэтому выведется 0
console.log(test);

test = !!test;
/*Для приведения к логическому типу используют оператор двойного отрицания.
 Поскольку после последнего преобраования test стала равна 0, то в boolean ринимает начение false.
 Обычно числовой тип имеет значение true, но 0 является исключением*/
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
  if (array[n] % 2) {
    //empty
  } else if (array[n] !== 0) console.log(array[n]);
}
