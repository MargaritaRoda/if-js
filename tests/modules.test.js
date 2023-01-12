import { max, min, pal, sum, replaceZerosToString } from '../src/modules.js';

test('Sum of two numbers', () => {
  const x = 2;
  const y = 5;

  expect(sum(x)(y)).toBe(7);
});

test('Check is string palindrome', () => {
  const cases = [
    ['12344321', true],
    ['324', false],
  ];

  for (let i = 0; i < cases.length; i += 1) {
    expect(pal(cases[i][0])).toBe(cases[i][1]);
  }
});

test('Show min number', () => {
  const a = 2;
  const b = 5;
  expect(min(a, b)).toBe(a);
});

test('Show max number', () => {
  const a = 2;
  const y = 7;
  expect(max(a, y)).toBe(y);
});

test('Replace number 0 string zero', () => {
  const array1 = [1, 100, 58, 30];
  expect(replaceZerosToString(array1)).toStrictEqual([
    1,
    '1zerozero',
    58,
    '3zero',
  ]);
});
