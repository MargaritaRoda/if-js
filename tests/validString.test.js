import { isValidString } from '../src/js/validString.js';
test('isValidString method to check syntax object in string', () => {
  const str = '{user: {name: "John", age: 21}}';
  expect(isValidString(str)).toStrictEqual(true);
});

test('isValidString method to check syntax object in string', () => {
  const str = '{user: {name: }{"John", age: 21{}}';
  expect(isValidString(str)).toStrictEqual(false);
});

test('isValidString method to check syntax object in string', () => {
  const str = '{user: {name: } "John", age: 21{}}';
  expect(isValidString(str)).toStrictEqual(false);
});
test('isValidString method to check syntax object in string', () => {
  const str = '{user: {name: "{John", age: 21}}}';
  expect(isValidString(str)).toStrictEqual(false);
});
