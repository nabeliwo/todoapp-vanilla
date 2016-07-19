import EventEmitter from './EventEmitter';

export default class Store extends EventEmitter {
  constructor(dispatcher) {
    super();

    this.todos = [];
  }
}
