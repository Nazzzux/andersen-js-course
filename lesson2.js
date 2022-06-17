
// 1

const makeObjectDeepCopy = (object) => {

  if (typeof(object) !== 'object' || object === null) {
    return object;
  }

  const result = Array.isArray(object) ? [] : {};

  for (let key in object) {
    result[key] = deepClone(object[key])
  }

  return result;
}


// 2

function selectFromInterval(arr, start, end) {
  try {
    if (! arr.every((item) => typeof(item) === 'number')) {
      throw new Error('Ошибка!');
    };
  
    if (start < 0 || end < 0) {
      return [];
    };
  
    return start < end 
              ? arr.filter((item) => start <= item && item <= end)  
              : arr.filter((item) => end <= item && item <= start); 
  } catch (err) {
    return err.message;
  };
};
