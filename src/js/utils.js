export const bubbleSort = (arr, comparator) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 1; j < arr.length - i; j++) {
      if (comparator(arr[j - 1], arr[j]) > 0) {
        const temporary = arr[j];
        arr[j] = arr[j - 1];
        arr[j - 1] = temporary;
      }
    }
  }
  return arr;
};
