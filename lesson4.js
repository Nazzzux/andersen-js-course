// 1

function concatStrings(value = '', separator) {
  const data = [{
    value,
    separator
  }];

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

// 2
const ERROR_MESSAGE = 'Invalid Input!';

class Calculator {
  constructor(firstNum, secondNum) {
    this.firstNum = firstNum;
    this.secondNum = secondNum;

    this.logSum = this.logSum.bind(this, arguments);
    this.logSub = this.logSub.bind(this, arguments);
    this.logMul = this.logMul.bind(this, arguments);
    this.logDiv = this.logDiv.bind(this, arguments);
      
    if (arguments.length !== 2){
      throw new Error(`${ERROR_MESSAGE} Please provide both numbers!`);
    };

    if (typeof (this.firstNum) !== 'number' || typeof (this.secondNum) !== 'number' || isNaN(this.firstNum) || isNaN(this.secondNum) || this.firstNum === Infinity || this.firstNum === -Infinity || this.secondNum === Infinity || this.secondNum === -Infinity || typeof (this.firstNum) === 'bigint' || typeof (this.secondNum) === 'bigint') {
      throw new Error(`${ERROR_MESSAGE} Please provide the numbers as inputs!`)
    };
  }

  setX(numberX) { 
    if (!numberX || typeof (numberX) !== 'number' || isNaN(numberX) || numberX === Infinity || numberX === -Infinity || typeof (numberX) === 'bigint' ) {
      throw new Error(`${ERROR_MESSAGE} The X is not a valid number`)
    };
    this.firstNum = numberX;
  }

  setY(numberY) { 
    if(!numberY || typeof(numberY) !== 'number' || isNaN(numberY) || numberY === Infinity || numberY === -Infinity || typeof(numberY) === 'bigint') {
      throw new Error(`${ERROR_MESSAGE} The Y is not a valid number`)
    };
    this.secondNum = numberY;
  } 

  logSum() {
    return console.log(this.firstNum + this.secondNum);
  }

  logSub() {
    return console.log(this.firstNum - this.secondNum);
  }

  logMul() {
    return console.log(this.firstNum * this.secondNum);
  }

  logDiv () {
    if (this.secondNum === 0) {
      throw new Error(`${ERROR_MESSAGE}! Divider equalls zero`)
    };
    return console.log(this.firstNum / this.secondNum);
  }
}