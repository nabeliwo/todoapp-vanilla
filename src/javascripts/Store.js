import EventEmitter from './EventEmitter';

export default class Store extends EventEmitter {
  constructor(dispatcher) {
    super();

    this.state = {
      todos: JSON.parse(localStorage.getItem('todos')) || []
    };

    dispatcher.on('addTodo', ::this._onAddTodo);
  }

  getState() {
    return this.state;
  }

  _onAddTodo(state) {
    const todo = Object.assign({}, state.todo, {
      id: this._getUniqueString()
    });

    this.state.todos = [
      ...this.state.todos,
      todo
    ];

    this._setLocalStorage();
    this.emit('ADDTODO', todo);
  }

  _getUniqueString() {
    return new Date().getTime().toString(16) + Math.floor(1000 * Math.random()).toString(16);
  }

  _setLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this.state.todos));
  }
}
