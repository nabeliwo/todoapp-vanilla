import Store from './Store';
import ActionCreator from './ActionCreator';
import EventEmitter from './EventEmitter';

import Type from './views/Type';
import EntireOperation from './views/EntireOperation';
import Length from './views/Length';
import TodoForm from './views/TodoForm';
import TodoList from './views/TodoList';

const dispatcher = new EventEmitter();
const store = new Store(dispatcher);
const action = new ActionCreator(dispatcher);

class TodoApp {
  constructor() {
    this.views = {
      typeView: new Type(),
      entireOperationView: new EntireOperation(),
      length: new Length(),
      todoForm: new TodoForm(action),
      todoList: new TodoList()
    };

    this._event();
  }

  start() {
    const state = store.getState();

    this._onHashChange();

    Object.keys(this.views).filter(key => typeof this.views[key].init === 'function').forEach(key => {
      this.views[key].init(state);
    });
  }

  _event() {
    window.addEventListener('hashchange', ::this._onHashChange, false);
    store.on('ADDTODO', ::this._onAddTodo);
  }

  _onHashChange() {
    const hash = location.hash.split('#/')[1] || 'all';
    this.views.typeView.render(hash);
  }

  _onAddTodo(todo) {
    this.views.todoList.add(todo);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const todoApp = new TodoApp();

  todoApp.start();
});
