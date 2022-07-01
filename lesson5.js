const NOT_ITERABLE_ERROR = 'The provided instance is not iterable';

class Node {
  constructor(data, next) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0
  }
  
  static fromIterable(iterable) {
    if (typeof iterable[Symbol.iterator] !== 'function') {
      throw new Error(NOT_ITERABLE_ERROR);
    }
    let result = new LinkedList();
    for (let item of iterable) {
      console.log(item);
      result.append(item);
    }
    return result;
  }

  prepend(elem) {
    this.head = new Node (elem, this.head)
    this.size++
  }

  append(elem) {
    let node = new Node(elem);
    let current;

    if (!this.head) {
      this.head = node
    } else {
      current = this.head
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }

    this.size++;
  }

  find(elem) {
    let current = this.head;

    while (current) {
      if (current.data === elem) {
        return current;
      }
      current = current.next;
    }
    return null;
  }

  toArray() {
    const arr = [];
    let current = this.head;

    while (current) {
      arr.push(current.data);
      current = current.next;
    }

    return arr;
  }
}

const ll = new LinkedList()
ll.append(100)
ll.append(200)
ll.append(300)
console.log(ll.find(100))

class Stack{
  constructor(maxElemQuantity = 10){
    this.items = [];
    this.count = 0;
    this.maxElemQuantity = maxElemQuantity;

    if (typeof(this.maxElemQuantity) !== 'number' || this.maxElemQuantity < 0 || isNaN(this.maxElemQuantity) || this.maxElemQuantity === Infinity || this.maxElemQuantity === -Infinity) {
      throw new Error('Invalid input');
    }
  }

  static fromIterable(iterable) {
    if (typeof iterable[Symbol.iterator] !== 'function') {
      throw new Error(NOT_ITERABLE_ERROR);
    }
    let result = new Stack();
    for (let item of iterable) {
      result.push(item);
    }
    return result;
  }

  push(elem) {
    if (this.maxElemQuantity === this.count) {
      throw new Error('The stack is full');
    }
    this.items[this.count] = elem;
    this.count++;
  }

  pop() {
    if (this.count === 0){
      throw new Error('The stack is empty');
    }
    let deletedItem = this.items[this.count - 1];
    delete this.items[this.count - 1];
    this.count--;
    return deletedItem;
  }

  peek() {
    if (this.count === 0) {
      return null;
    }
    return this.items[this.count - 1];
  }

  isEmpty() {
    return this.count === 0;
  }

  toArray() {
    return [...this.items];
  }
}


// module.exports = { Stack };
