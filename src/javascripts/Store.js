import EventEmitter from './EventEmitter';
import getUrlHash from './utils/getUrlHash';

export default class Store extends EventEmitter {
  constructor(dispatcher) {
    super();

    this.state = {
      filter: {
        current: getUrlHash(),
        list: ['all', 'active', 'completed']
      },
      todos: this._getLocalStorage('todos') || []
    };

    dispatcher.on('changeFilter', ::this._onChangeFilter);
    dispatcher.on('addTodo', ::this._onAddTodo);
    dispatcher.on('editTodo', ::this._onEditTodo);
    dispatcher.on('deleteTodo', ::this._onDeleteTodo);
    dispatcher.on('changeAllTodo', ::this._onChangeAllTodo);
    dispatcher.on('deleteAllCompletedTodo', ::this._onDeleteAllCompletedTodo);
  }

  getState() {
    return this.state;
  }

  _getLocalStorage(str) {
    return JSON.parse(localStorage.getItem(str));
  }

  _setLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this.state.todos));
  }

  _onChangeFilter(state) {
    this.state = Object.assign({}, this.state, {
      filter: {
        current: state.hash,
        list: this.state.filter.list
      }
    });
    this.emit('CHANGE FILTER');
  }

  _onAddTodo(state) {
    const todo = Object.assign({}, state.todo, {
      id: this._getUniqueString()
    });

    this.state = Object.assign({}, this.state, {
      todos: [
        ...this.state.todos,
        todo
      ]
    });
    this._changeTodo();
  }

  _getUniqueString() {
    return new Date().getTime().toString(16) + Math.floor(1000 * Math.random()).toString(16);
  }

  _onEditTodo(state) {
    this.state = Object.assign({}, this.state, {
      todos: this.state.todos.map(todo => {
        if (todo.id === state.todo.id) {
          return state.todo;
        }

        return todo;
      })
    });
    this._changeTodo();
  }

  _onDeleteTodo(state) {
    this.state = Object.assign({}, this.state, {
      todos: this.state.todos.filter(todo => todo.id !== state.todo.id)
    });
    this._changeTodo();
  }

  _onChangeAllTodo(state) {
    this.state = Object.assign({}, this.state, {
      todos: this.state.todos.map(todo => Object.assign({}, todo, {
        isCompleted: state.isCompleted
      }))
    });
    this._changeTodo();
  }

  _onDeleteAllCompletedTodo() {
    this.state = Object.assign({}, this.state, {
      todos: this.state.todos.filter(todo => !todo.isCompleted)
    });
    this._changeTodo();
  }

  _changeTodo() {
    this._setLocalStorage();
    this.emit('CHANGE TODO', this.getState());
  }
}
