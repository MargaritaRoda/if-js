import { bubbleSort } from '../src/js/utils.js';
test('BubbleSort method for arrays of objects, return sorted list', () => {
  const arr = [{ name: 'c' }, { name: 'd' }, { name: 'a' }, { name: 'g' }];
  expect(
    bubbleSort(arr, (firstItem, secondItem) => {
      const currentName = firstItem['name'];
      const nextName = secondItem['name'];
      return currentName.localeCompare(nextName);
    }),
  ).toStrictEqual([{ name: 'a' }, { name: 'c' }, { name: 'd' }, { name: 'g' }]);
});

test('BubbleSort method for array of strings, return sorted list', () => {
  const arr = ['c', 'd', 'a', 'g'];
  expect(
    bubbleSort(arr, (firstItem, secondItem) => {
      return firstItem.localeCompare(secondItem);
    }),
  ).toStrictEqual(['a', 'c', 'd', 'g']);
});

test('BubbleSort method for array of numbers, return sorted list', () => {
  const arr = [1, -123, 12, 2];
  expect(
    bubbleSort(arr, (firstItem, secondItem) => {
      if (firstItem > secondItem) {
        return 1;
      }
      if (firstItem < secondItem) {
        return -1;
      }
      return 0;
    }),
  ).toStrictEqual([-123, 1, 2, 12]);
});
