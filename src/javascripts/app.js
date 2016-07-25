import getUrlHash from './utils/getUrlHash';

import EventEmitter from './EventEmitter';
import Store from './Store';
import ActionCreator from './ActionCreator';

import Filter from './views/Filter';
import Operation from './views/Operation/';
import Length from './views/Length';
import TodoForm from './views/Todo/Form';
import TodoList from './views/Todo/List';

const dispatcher = new EventEmitter();
const store = new Store(dispatcher);
const action = new ActionCreator(dispatcher);

class TodoApp {
  constructor() {
    this.views = {
      filter: new Filter(),
      operation: new Operation(action),
      length: new Length(),
      todoForm: new TodoForm(action),
      todoList: new TodoList(action)
    };

    this._event();
  }

  start() {
    const state = store.getState();

    Object.keys(this.views).filter(key => typeof this.views[key].render === 'function').forEach(key => {
      this.views[key].render(state);
    });
  }

  _event() {
    window.addEventListener('hashchange', () => { action.changeFilter(getUrlHash()); }, false);

    store.on('CHANGE FILTER', ::this._onChangeFilter);
    store.on('CHANGE TODO', ::this._onChangeTodo);
  }

  _onChangeFilter() {
    const state = store.getState();

    this.views.filter.render(state);
    this.views.todoList.render(state);
  }

  _onChangeTodo(state) {
    this.views.todoList.render(state);
    this.views.operation.render(state);
    this.views.length.render(state);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const todoApp = new TodoApp();

  todoApp.start();
});
