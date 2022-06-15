const ERROR_MESSAGE = 'Некорректный ввод!';

// 1
let userNumber = prompt('Введите, пожалуйста, конвертируемое число:');
let userBase = prompt('Введите, пожалуйста,  основание системы счисления:');

function toNumeralSystem(num, base) {
  return (isNaN(num) || isNaN(base)) ? ERROR_MESSAGE :  Number(num).toString(Number(base));
};

console.log(toNumeralSystem(userNumber, userBase));

// 2

function sumAndQuotient() {
  let first = prompt('Введите, пожалуйста, первое число:');
  if (isNaN(first)) return ERROR_MESSAGE;
  
  let second = prompt('Введите, пожалуйста,  второе число:');
  if (isNaN(first)) return ERROR_MESSAGE;

  return `Ответ: ${Number(first) + Number(second)}, ${first / second}`;
};

console.log(sumAndQuotient());