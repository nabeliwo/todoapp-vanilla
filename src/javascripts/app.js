import getUrlHash from './utils/getUrlHash';

import EventEmitter from './EventEmitter';
import Store from './Store';
import ActionCreator from './ActionCreator';

import Filter from './views/Filter';
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
      filter: new Filter(),
      entireOperation: new EntireOperation(action),
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
    store.on('ADD TODO', ::this._onAddTodo);
    store.on('EDIT TODO', ::this._onEditTodo);
    store.on('DELETE TODO', ::this._onDeleteTodo);
    store.on('CHANGE ALL TODO', ::this._onChangeAllTodo);
  }

  _onChangeFilter() {
    const state = store.getState();

    this.views.filter.render(state);
    this.views.todoList.render(state);
  }

  _onAddTodo(todo) {
    const state = store.getState();

    this.views.todoList.add(todo);
    this.views.entireOperation.render(state);
    this.views.length.render(state);
  }

  _onEditTodo(todo) {
    const state = store.getState();

    this.views.todoList.edit(todo);
    this.views.entireOperation.render(state);
    this.views.length.render(state);
  }

  _onDeleteTodo(todo) {
    const state = store.getState();

    this.views.todoList.delete(todo);
    this.views.entireOperation.render(state);
    this.views.length.render(state);
  }

  _onChangeAllTodo() {
    const state = store.getState();

    this.views.todoList.render(state);
    this.views.entireOperation.render(state);
    this.views.length.render(state);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const todoApp = new TodoApp();

  todoApp.start();
});
