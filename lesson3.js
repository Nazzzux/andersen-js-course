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

// 2 

function createDebounceFunction(func, delayMs) {
  let timeoutID;
  return function() {
    const funcCall = () => {
      func.apply(this, arguments)
    };
    clearTimeout(timeoutID);
    timeoutID = setTimeout(funcCall, delayMs);
  };
};

const log100 = () => console.log(100);
const debounceLog100 = createDebounceFunction(log100, 1000);

setTimeout(debounceLog100, 200);
setTimeout(debounceLog100, 400);