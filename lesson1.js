const ERROR_MESSAGE = 'Некорректный ввод!';

// 1
let userNumber = prompt('Введите, пожалуйста, конвертируемое число:'),
    userBase = prompt('Введите, пожалуйста,  основание системы счисления:');

function toNumeralSystem(num, base) {
  return (isNaN(num) || isNaN(base)) ? ERROR_MESSAGE :  Number(num).toString(Number(base));
};

console.log(toNumeralSystem(userNumber, userBase));

// 2

let userFirstNumber = prompt('Введите, пожалуйста, первое число:'),
    userSecondNumber = prompt('Введите, пожалуйста,  второе число:');

function sumAndQuotient(first, second) {
  if ( isNaN(first) || isNaN(second) ) {
    return ERROR_MESSAGE;
  } else {
    return `Ответ: ${Number(first) + Number(second)}, ${first / second}`;
  }
};

console.log(sumAndQuotient(userFirstNumber, userSecondNumber));