import TodoItem from './TodoItem';

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
    }).forEach(::this.add);
  }

  add(todo) {
    const todoItem = new TodoItem(this.action);

    this.list.appendChild(todoItem.render(todo));
  }

  edit(todo) {
    const todoItem = new TodoItem(this.action);
    const oldTodo = document.getElementById(todo.id);

    this.list.replaceChild(todoItem.render(todo), oldTodo);
  }

  delete(todo) {
    const deletedTodo = document.getElementById(todo.id);
    deletedTodo.parentNode.removeChild(deletedTodo);
  }
}
