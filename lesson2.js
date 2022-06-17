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
