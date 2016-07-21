export default class Length {
  constructor() {
    this.length = document.querySelector('.js-length');
  }

  render(state) {
    const { todos } = state;
    const todoLength = todos.length;
    const completedLength = todos.filter(todo => todo.isCompleted).length;

    this.length.textContent = `${completedLength} / ${todoLength}`;
  }
}
