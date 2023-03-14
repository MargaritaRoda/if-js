import { bubbleSort } from '../src/js/utils.js';
test('BubbleSort method for arrays of objects, return sorted list', () => {
  const arr = [{ name: 'c' }, { name: 'd' }, { name: 'a' }, { name: 'g' }];
  expect(
    bubbleSort(arr, (item1, item2) => {
      const currentName = item1['name'];
      const nextName = item2['name'];
      return currentName.localeCompare(nextName);
    }),
  ).toStrictEqual([{ name: 'a' }, { name: 'c' }, { name: 'd' }, { name: 'g' }]);
});

test('BubbleSort method for array of strings, return sorted list', () => {
  const arr = ['c', 'd', 'a', 'g'];
  expect(
    bubbleSort(arr, (item1, item2) => {
      return item1.localeCompare(item2);
    }),
  ).toStrictEqual(['a', 'c', 'd', 'g']);
});

test('BubbleSort method for array of numbers, return sorted list', () => {
  const arr = [1, -123, 12, 2];
  expect(
    bubbleSort(arr, (item1, item2) => {
      if (item1 > item2) {
        return 1;
      }
      if (item1 < item2) {
        return -1;
      }
      return 0;
    }),
  ).toStrictEqual([-123, 1, 2, 12]);
});
