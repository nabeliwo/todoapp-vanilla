export default class TodoForm {
  constructor(action) {
    this.action = action;
    this.form = document.querySelector('.js-todo-form');
  }

  init() {
    this.form.addEventListener('submit', ::this.onSubmit, false);
  }

  onSubmit(e) {
    e.preventDefault();

    const input = e.target.todo;

    this.action.addTodo({
      isCompleted: false,
      content: input.value
    });
    input.value = '';
  }
}
