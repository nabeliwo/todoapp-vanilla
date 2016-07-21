export default class ActionCreator {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }

  changeFilter(hash) {
    this.dispatcher.emit('changeFilter', { hash });
  }

  addTodo(todo) {
    this.dispatcher.emit('addTodo', { todo });
  }

  editTodo(todo) {
    this.dispatcher.emit('editTodo', { todo });
  }

  deleteTodo(todo) {
    this.dispatcher.emit('deleteTodo', { todo });
  }

  changeAllTodo(isCompleted) {
    this.dispatcher.emit('changeAllTodo', { isCompleted });
  }

  deleteAllCompletedTodo() {
    this.dispatcher.emit('deleteAllCompletedTodo');
  }
}
