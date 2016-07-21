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
      todos: JSON.parse(localStorage.getItem('todos')) || []
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

    this._setLocalStorage();
    this.emit('ADD TODO', todo);
  }

  _getUniqueString() {
    return new Date().getTime().toString(16) + Math.floor(1000 * Math.random()).toString(16);
  }

  _setLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this.state.todos));
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
    this._setLocalStorage();
    this.emit('EDIT TODO', state.todo);
  }

  _onDeleteTodo(state) {
    this.state = Object.assign({}, this.state, {
      todos: this.state.todos.filter(todo => todo.id !== state.todo.id)
    });
    this._setLocalStorage();
    this.emit('DELETE TODO', state.todo);
  }

  _onChangeAllTodo(state) {
    this.state = Object.assign({}, this.state, {
      todos: this.state.todos.map(todo => Object.assign({}, todo, {
        isCompleted: state.isCompleted
      }))
    });
    this._setLocalStorage();
    this.emit('CHANGE ALL TODO');
  }

  _onDeleteAllCompletedTodo() {
    this.state = Object.assign({}, this.state, {
      todos: this.state.todos.filter(todo => !todo.isCompleted)
    });
    this._setLocalStorage();
    this.emit('CHANGE ALL TODO');
  }
}
