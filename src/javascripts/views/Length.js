export default class Length {
  constructor() {
    this.length = document.querySelector('.js-length');
  }

  init(state) {
    this.render(state);
  }

  render(state) {
    const todos = state.todos;
    const todoLength = todos.length;
    const completedLength = todos.filter(todo => todo.isCompleted).length;

    this.length.textContent = `${completedLength} / ${todoLength}`;
  }
}
