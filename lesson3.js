// 1

Array.prototype.myFilter = function(filterFunc, thisArg) {
  const filteredArray = [];

  for (let i = 0; i < this.length; i++) {
    if (filterFunc.apply(thisArg, [this[i], i, this])) {
      filteredArray.push(this[i]);
    };
  };

  return filteredArray;
}
