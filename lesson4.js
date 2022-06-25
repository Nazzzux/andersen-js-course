// 1

function concatStrings(value = '', separator) {
  const data = [{
    value,
    separator
  }];
  console.log('data', data);

  return function innerConcat(value, separator) {
    if (typeof value === "string") {
      data.push({
        value,
        separator
      });
      return innerConcat;
    } else {
      let separator = '';
      let accumulator = '';

      data.forEach(item => {
        accumulator += separator + item.value;
        separator = item.separator && typeof (separator) === 'string' ? item.separator : separator;
      });
      return accumulator;
    }
  }
}

