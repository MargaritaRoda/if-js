export const isValidString = (str) => {
  const arr = str.replace(/\s+/g, '').split('');
  const stack = [];
  const open = '{';
  const close = '}';
  if (arr[0] !== open || arr[arr.length - 1] !== close) {
    return false;
  }
  for (let i = 0; i < arr.length; i++) {
    if (arr[i - 1] === ':' && arr[i] === close) {
      return false;
    }
    if (arr[i - 1] === '"' && arr[i] === close) {
      return false;
    }
    if (arr[i - 1] === '"' && arr[i] === open) {
      return false;
    }

    if (arr[i] === open) {
      stack.push(arr[i]);
    } else if (arr[i] === close) {
      arr[i] = stack.pop();
    }
  }
  return stack.length === 0;
};
