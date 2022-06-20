const ERROR_MESSAGE = 'Ошибка!';

// 1

const makeObjectDeepCopy = (object) => {

  if (typeof(object) !== 'object' || object === null) {
    return object;
  };

  const result = Array.isArray(object) ? [] : {};

  for (let key in object) {
    result[key] = makeObjectDeepCopy(object[key])
  };

  return result;
};

// 2

function selectFromInterval(arr, start, end) {
  try {
    if (!Array.isArray(arr)) {
      throw new Error(ERROR_MESSAGE + ' Первый аргумент не является массивом.');
    };

    if (! arr.every((item) => typeof(item) === 'number')) {
      throw new Error(ERROR_MESSAGE + ' Массив содержит невалидные данные (не числовые значения).');
    };
  
    if (typeof(start) !== 'number') {
      throw new Error(ERROR_MESSAGE + ' Первый агрумент не вадиден.')
    };

    if (typeof(end) !== 'number') {
      throw new Error(ERROR_MESSAGE + ' Третий агрумент не вадиден.')
    }

    return start < end 
              ? arr.filter((item) => start <= item && item <= end)  
              : arr.filter((item) => end <= item && item <= start); 
  } catch (err) {
    return err.message;
  };
};

selectFromInterval([1,3,5], 5, 2);
selectFromInterval([-2, -15, 0, 4], -13, -5);
selectFromInterval([-2, -7, -15, 0, 4], -13, -5);
selectFromInterval(['aaa'], 2, 3);
selectFromInterval({}, 2, 3);

// 3

const myIterable = { from: 1, to: 4 };

myIterable[Symbol.iterator] = function() {
  if (typeof(this.from) !== 'number' || typeof(this.to) !== 'number' || this.from > this.to) {
    throw new Error(ERROR_MESSAGE);
  };
  return {
    current: this.from,
    last: this.to,
    next() {
      return {
        done: this.current > this.last,
        value: this.current++,
      };
    },
  };
};

for (let num of myIterable) {
  console.log(num);
}

myIterable.from = 'aaa';

for (let num of myIterable) {
  console.log(num);
}


