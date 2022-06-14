// 1
let userNumber = prompt('Введите, пожалуйста, конвертируемое число:'),
    userBase = prompt('Введите, пожалуйста,  основание системы счисления:');

function toNumeralSystem(num, base) {
  return !(isNaN(num) || isNaN(base)) ? (num * 1).toString(base * 1) : 'Некорректный ввод!';
};

console.log(toNumeralSystem(userNumber, userBase));

// 2

let userFirstNumber = prompt('Введите, пожалуйста, первое число:'),
    userSecondNumber = prompt('Введите, пожалуйста,  второе число:');

function sumAndQuotient(first, second) {
  if ( !(isNaN(first) || isNaN(second)) ) {
    return `Ответ: ${(first * 1) + (second * 1)}, ${first / second}`;
  } else {
    return 'Некорректный ввод!'
  }
};

console.log(sumAndQuotient(userFirstNumber, userSecondNumber));