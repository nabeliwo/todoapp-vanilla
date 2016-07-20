import TodoItem from './TodoItem';

export default class TodoList {
  constructor() {
    this.list = document.querySelector('.js-todo-list');
  }

  init(state) {
    state.todos.forEach(::this.add);
  }

  add(todo) {
    const todoItem = new TodoItem();

    this.list.appendChild(todoItem.render(todo));
  }
}
