const CALCULATOR_CONFIG = {
  0: { type: 'number', value: 7, title: '7' },
  1: { type: 'number', value: 8, title: '8' },
  2: { type: 'number', value: 9, title: '9' },
  3: { type: 'operator', value: 'plus', title: '+' },
  4: { type: 'number', value: 6, title: '6' },
  5: { type: 'number', value: 4, title: '4' },
  6: { type: 'number', value: 5, title: '5' },
  7: { type: 'operator', value: 'minus', title: '-' },
  8: { type: 'number', value: 1, title: '1' },
  9: { type: 'number', value: 2, title: '2' },
  10: { type: 'number', value: 3, title: '3' },
  11: { type: 'operator', value: 'multiply', title: '*' },
  12: { type: 'number', value: 0, title: '0' },
  13: { type: 'number', value: '.', title: '.' },
  14: { type: 'result', value: 'equal', title: '=' },   
  15: { type: 'operator', value: 'divide', title: '/' },
  16: { type: 'edit', value: 'sign', title: '+/-' }, 
  17: { type: 'edit', value: 'clear', title: 'C' },
  18: { type: 'edit', value: 'backspace', title: '<-' },
}

class Calculator {
  constructor() {
    this.currentValue = '';
    this.previousValue = '';
    this.operation = null;
  }

  bindScreenChange = (callback) => {
    this.screenChange = callback;
  }

  setOperand = (anotherValue) => {
    if (this.operation === null && this.previousValue !== '') {
      this.previousValue = '';
    }
    let hasDecimal = this.currentValue.indexOf('.') !== -1;
    if (anotherValue === '.' && hasDecimal) {
      return;
    }
    if (this.currentValue.length >= 14) {
      return;
    }
    if (this.currentValue === '' && anotherValue === '0') {
      return;
    }
    if (this.currentValue === '' && anotherValue === '.') {
      this.currentValue = '0';
    }
    if (hasDecimal) {
      const decimalDigits = this.currentValue.split('.')[1];
      if (decimalDigits.length >= 8) {
        return;
      }
    }
    this.currentValue += anotherValue;
    this.screenChange(this.currentValue);
  }

  setOperation = (value) => {
    if (this.previousValue === '') {
      this.previousValue = this.currentValue;
      this.currentValue = '';
    } else if (this.currentValue !== '') {
      this.makeResult();
    }
    this.operation = value;
  }

  makeResult = () => {
    if (this.previousValue === '' || this.currentValue === '') {
      return;
    }
    const handler = this[this.operation];
    if (!handler) {
      return;
    }
    this.operation = null;
    let result = handler();
    if (this.isValid(result)) {
      this.currentValue = '';
      this.previousValue = this.roundRes(result);
      if (this.previousValue.length > 14) {
        this.previousValue = '';
        this.screenChange('Error');
      } else {
        this.screenChange(this.previousValue);
      }
    } else {
      this.previousValue = '';
      this.currentValue = '';
      this.screenChange('Error');
    }
  }

  clear = () => {
    this.currentValue = '';
    this.operation = null;
    this.screenChange(this.currentValue);
  }

  backspace = () => {
    if (this.currentValue === '') {
      return;
    }
    this.currentValue = this.currentValue.slice(0, -1);
    this.screenChange(this.currentValue);
  }

  sign = () => {
    if (this.currentValue === '') {
      return;
    }
    if (this.currentValue[0] === '-') {
      this.currentValue = this.currentValue.slice(1);
    } else {
      this.currentValue = '-' + this.currentValue;
    }
    this.screenChange(this.currentValue);
  }

  plus = () => {
    return parseFloat(this.previousValue) + parseFloat(this.currentValue);
  }

  minus = () => {
    return parseFloat(this.previousValue) - parseFloat(this.currentValue);
  }

  multiply = () => {
    return parseFloat(this.previousValue) * parseFloat(this.currentValue);
  }

  divide = () => {
    return parseFloat(this.previousValue) / parseFloat(this.currentValue);
  }

  isValid = (number) => {
    return (!isNaN(number) && isFinite(number));
  }

  roundRes = (value) => {
    let limit = Math.pow(10, 8);
    return String(Math.round(value * limit) / limit);
  }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    view.numpadListener(this.processNumPad);
    model.bindScreenChange(view.updateScreen);
  }

  processNumPad = (event) => {
    if (event.target.hasAttribute('data-value')) {
      const type = event.target.getAttribute('data-type');
      const value = event.target.getAttribute('data-value');
      switch (type) {
        case 'number':
          this.model.setOperand(value);
          break;
        case 'operator':
          this.model.setOperation(value);
          break;
        case 'result':
          this.model.makeResult();
          break;
        case 'edit':
          if (value === 'backspace') {
            this.model.backspace();
          } 
          if (value === 'clear') {
            this.model.clear();
          } 
          if (value === 'sign') {
            this.model.sign();
          }
        default:
          return;
      }
    }
  }
}

class Button {
  constructor({ title, value, type }) {
    this.title = title;
    this.value = value;
    this.type = type;

    return this.render();
  }

  render() {
    const button = document.createElement('button');
    button.innerText = this.title;
    button.setAttribute('data-value', this.value);
    button.setAttribute('data-type', this.type);

    return button;
  }
}

class Screen {
  constructor() {
    this.value = 0;
    this.input;
  }

  render = () => {
    this.input = document.createElement('input');
    this.input.setAttribute('type', 'text');
    this.input.setAttribute('readonly', true);
    this.input.setAttribute('value', this.value);
    this.input.classList.add('screen');
    return this.input;
  }

  setValue = (newValue) => {
    if (newValue === '') {
      this.input.setAttribute('value', '0');
    } else {
      this.input.setAttribute('value', newValue);
    }
  }
}

class Output {
  constructor(config) {
    this.root = document.querySelector('#root');
    this.screen = new Screen();
    this.config = config;

    this.init();
  }

  init = () => {
    this.numPad = document.createElement('div');
    this.numPad.classList.add('numpad');
    this.numPad.appendChild(this.screen.render());
    Object.keys(this.config).forEach((key) => {
      let buttonConfig = this.config[key];
      if (buttonConfig.type === 'number') {
        this.numPad.appendChild(new Num(buttonConfig));
      } else if (buttonConfig.type === 'change') {
        this.numPad.appendChild(new Clear(buttonConfig));
      } else if (buttonConfig.type == 'result') {
        this.numPad.appendChild(new Result(buttonConfig));
      } else {
        this.numPad.appendChild(new Button(buttonConfig));
      }
    });
    this.root.appendChild(this.numPad);
  }

  numpadListener = (handler) => {
    this.numPad.addEventListener('click', handler);
  }

  updateScreen = (value) => {
    this.screen.setValue(value);
  }
}

class Result extends Button {
  constructor({ title, value, type }) {
    let button = super({ title, value, type });
    button.classList.add('result');
    return button;
  }
}

class Num extends Button {
  constructor({ title, value, type }) {
    let button = super({ title, value, type });
    button.classList.add('num');
    return button;
  }
}

class Clear extends Button {
  constructor({ title, value, type }) {
    let button = super({ title, value, type });
    button.classList.add('clear');
    return button;
  }
}


new Controller(new Calculator(), new Output(CALCULATOR_CONFIG));