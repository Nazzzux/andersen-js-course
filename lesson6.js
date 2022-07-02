class Car {
  #brand;
  #model;
  #yearOfManufacturing;
  #maxSpeed;
  #maxFuelVolume;
  #fuelConsumption;
  #currentFuelVolume;
  #isStarted;
  #mileage;
  constructor(parameters = {}) {
    this.#brand = parameters.brand; 
    this.#model = parameters.model;
    this.#yearOfManufacturing = parameters.yearOfManufacturing; 
    this.#maxSpeed = parameters.maxSpeed;
    this.#maxFuelVolume = parameters.maxFuelVolume;
    this.#fuelConsumption = parameters.fuelConsumption;
    this.#currentFuelVolume = parameters.currentFuelVolume || 0;
    this.#isStarted = parameters.isStarted || false;
    this.#mileage = parameters.mileage || 0;
  }

  get brand() {
    return this.#brand;
  }
  
  set brand(title) {
    if (typeof(title) !== 'string' || title.length < 1 || title.length > 50) {
      throw new Error('ВВедите, пожалуйста, строку длиной до пятидесяти символов');
    }
    this.#brand = title;
  }

  get model() {
    return this.#model;
  }
  
  set model(title) {
    if (typeof(title) !== 'string' || title.length < 1 || title.length > 50) {
      throw new Error('ВВедите, пожалуйста, строку длиной до пятидесяти символов');
    }
    this.#model = title;
  }

  get yearOfManufacturing() {
    return this.#yearOfManufacturing;
  }

  set yearOfManufacturing(year) {
    let currentYear = new Date().getFullYear();
    if (typeof(year) !== 'number' || year < 1900 || year > currentYear) {
      throw new Error('Введите, пожалуйста, год в пределах от 1900 до текущего года включительно');
    }
    this.#yearOfManufacturing = year;
  }

  get maxSpeed() {
    return this.#maxSpeed;
  }

  set maxSpeed(speed) {
    if (typeof(speed) !== 'number' || speed < 100 || speed > 300) {
      throw new Error('Введите, пожалуйста, скорость в пределах от 100км/ч жо 300 км/ч');
    }
    this.#maxSpeed = speed;
  }

  get maxFuelVolume() {
    return this.#maxFuelVolume;
  }

  set maxFuelVolume(liters) {
    if (typeof(liters) !== 'number' || liters < 5 || liters > 20) {
      throw new Error('Введите, пожалуйста, количество литров в пределах от 5л до 20л');
    }
    this.#maxFuelVolume = liters;
  }

  get fuelConsumption() {
    return this.#fuelConsumption;
  }

  set fuelConsumption(liters) {
    if (typeof(liters) !== 'number') {
      throw new Error('Введите, пожалуйста, число расхода литров на 100км пути');
    }
    this.#fuelConsumption = liters;
  }

  get isStarted() {
    return this.#isStarted;
  }

  get currentFuelVolume() {
    return this.#currentFuelVolume;
  }

  get mileage() {
    return this.#mileage;
  }
  
  start() {
    if (this.#isStarted === true) {
      throw new Error('Машина уже заведена');
    } else {
      this.#isStarted = true;
    }
  }

  shutDownEngine() {
    if (this.#isStarted === false) {
      throw new Error('Машина ещё не заведена');
    }
    this.#isStarted = false;
  }

  fillUpGasTank(fuelAmountInL) {
    if (typeof(fuelAmountInL) !== 'number') {
      throw new Error('Неверное количество топлива для заправки');
    }
    if (fuelAmountInL <= 0) {
      throw new Error('Неверное количество топлива для заправки')
    }
    if (fuelAmountInL + this.#currentFuelVolume > this.#maxFuelVolume) {
      throw new Error('Топливный бак переполнен');
    }
    this.#currentFuelVolume += fuelAmountInL;
  }

  drive(speed, hours) {
    const distance = speed * hours;
    const consumedFuel = (this.#fuelConsumption * distance) / 100;

    if (typeof(speed) !== 'number' || speed <= 0) {
      throw new Error('Неверная скорость');
    }

    if (typeof(hours) !== 'number' || hours <= 0) {
      throw new Error('Неверное количество часов');
    }

    if (speed > this.#maxSpeed) {
      throw new Error('Машина не может ехать так быстро');
    }

    if (this.#isStarted === false) {
      throw new Error('Машина должна быть заведена, чтобы ехать');
    }

    if (consumedFuel > this.#currentFuelVolume) {
      throw new Error('Недостаточно топлива');
    }

    this.#currentFuelVolume -= consumedFuel;
    this.#mileage += distance;
  }
}

export class {Car};