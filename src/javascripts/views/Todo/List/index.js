import TodoItem from './Item/';

export default class TodoList {
  constructor(action) {
    this.action = action;
    this.list = document.querySelector('.js-todo-list');
  }

  render(state) {
    const { todos, filter } = state;

    this.list.innerHTML = '';
    todos.filter(todo => {
      switch (filter.current) {
        case 'active':
          return !todo.isCompleted;

        case 'completed':
          return todo.isCompleted;

        case 'all':
        default:
          return todo;
      }
    }).forEach(::this._add);
  }

  _add(todo) {
    const todoItem = new TodoItem(this.action);

    this.list.appendChild(todoItem.render(todo));
  }
}
