export function deepEqual(obj1, obj2) {
  const arrObjKeys = Object.keys(obj1);
  const arrObj2Keys = Object.keys(obj2);
  if (arrObjKeys.length !== arrObj2Keys.length) {
    return false;
  }
  for (const property in obj1) {
    if (!(property in obj2)) {
      return false;
    }
  }
  for (let i = 0; i < arrObjKeys.length; i++) {
    const obj1Value = obj1[arrObjKeys[i]];
    const obj2Value = obj2[arrObjKeys[i]];
    if (typeof obj1Value === 'object' && typeof obj2Value === 'object') {
      if (deepEqual(obj1Value, obj2Value) !== true) {
        return false;
      } else {
        continue;
      }
    }
    if (obj1Value !== obj2Value) {
      return false;
    }
  }
  return true;
}
