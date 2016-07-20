export default class ActionCreator {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }

  addTodo(todo) {
    this.dispatcher.emit('addTodo', { todo });
  }
}
