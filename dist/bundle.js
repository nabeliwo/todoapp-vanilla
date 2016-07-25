(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ActionCreator = function () {
  function ActionCreator(dispatcher) {
    _classCallCheck(this, ActionCreator);

    this.dispatcher = dispatcher;
  }

  _createClass(ActionCreator, [{
    key: 'changeFilter',
    value: function changeFilter(hash) {
      this.dispatcher.emit('changeFilter', { hash: hash });
    }
  }, {
    key: 'addTodo',
    value: function addTodo(todo) {
      this.dispatcher.emit('addTodo', { todo: todo });
    }
  }, {
    key: 'editTodo',
    value: function editTodo(todo) {
      this.dispatcher.emit('editTodo', { todo: todo });
    }
  }, {
    key: 'deleteTodo',
    value: function deleteTodo(todo) {
      this.dispatcher.emit('deleteTodo', { todo: todo });
    }
  }, {
    key: 'changeAllTodo',
    value: function changeAllTodo(isCompleted) {
      this.dispatcher.emit('changeAllTodo', { isCompleted: isCompleted });
    }
  }, {
    key: 'deleteAllCompletedTodo',
    value: function deleteAllCompletedTodo() {
      this.dispatcher.emit('deleteAllCompletedTodo');
    }
  }]);

  return ActionCreator;
}();

exports.default = ActionCreator;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventEmitter = function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);

    this._handlers = {};
  }

  _createClass(EventEmitter, [{
    key: 'on',
    value: function on(type, handler) {
      if (typeof this._handlers[type] === 'undefined') {
        this._handlers[type] = [];
      }

      this._handlers[type].push(handler);
    }
  }, {
    key: 'off',
    value: function off(type, handler) {
      var handlers = this._handlers[type] || [];

      handlers.forEach(function (myHandler, i) {
        if (myHandler === handler) {
          handlers.splice(i, 1);
        }
      });
    }
  }, {
    key: 'emit',
    value: function emit(type, data) {
      var _this = this;

      var handlers = this._handlers[type] || [];

      handlers.forEach(function (handler) {
        handler.call(_this, data);
      });
    }
  }]);

  return EventEmitter;
}();

exports.default = EventEmitter;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EventEmitter2 = require('./EventEmitter');

var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);

var _getUrlHash = require('./utils/getUrlHash');

var _getUrlHash2 = _interopRequireDefault(_getUrlHash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Store = function (_EventEmitter) {
  _inherits(Store, _EventEmitter);

  function Store(dispatcher) {
    _classCallCheck(this, Store);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Store).call(this));

    _this.state = {
      filter: {
        current: (0, _getUrlHash2.default)(),
        list: ['all', 'active', 'completed']
      },
      todos: _this._getLocalStorage('todos') || []
    };

    dispatcher.on('changeFilter', _this._onChangeFilter.bind(_this));
    dispatcher.on('addTodo', _this._onAddTodo.bind(_this));
    dispatcher.on('editTodo', _this._onEditTodo.bind(_this));
    dispatcher.on('deleteTodo', _this._onDeleteTodo.bind(_this));
    dispatcher.on('changeAllTodo', _this._onChangeAllTodo.bind(_this));
    dispatcher.on('deleteAllCompletedTodo', _this._onDeleteAllCompletedTodo.bind(_this));
    return _this;
  }

  _createClass(Store, [{
    key: 'getState',
    value: function getState() {
      return this.state;
    }
  }, {
    key: '_getLocalStorage',
    value: function _getLocalStorage(str) {
      return JSON.parse(localStorage.getItem(str));
    }
  }, {
    key: '_setLocalStorage',
    value: function _setLocalStorage() {
      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }
  }, {
    key: '_onChangeFilter',
    value: function _onChangeFilter(state) {
      this.state = Object.assign({}, this.state, {
        filter: {
          current: state.hash,
          list: this.state.filter.list
        }
      });
      this.emit('CHANGE FILTER');
    }
  }, {
    key: '_onAddTodo',
    value: function _onAddTodo(state) {
      var todo = Object.assign({}, state.todo, {
        id: this._getUniqueString()
      });

      this.state = Object.assign({}, this.state, {
        todos: [].concat(_toConsumableArray(this.state.todos), [todo])
      });
      this._changeTodo();
    }
  }, {
    key: '_getUniqueString',
    value: function _getUniqueString() {
      return new Date().getTime().toString(16) + Math.floor(1000 * Math.random()).toString(16);
    }
  }, {
    key: '_onEditTodo',
    value: function _onEditTodo(state) {
      this.state = Object.assign({}, this.state, {
        todos: this.state.todos.map(function (todo) {
          if (todo.id === state.todo.id) {
            return state.todo;
          }

          return todo;
        })
      });
      this._changeTodo();
    }
  }, {
    key: '_onDeleteTodo',
    value: function _onDeleteTodo(state) {
      this.state = Object.assign({}, this.state, {
        todos: this.state.todos.filter(function (todo) {
          return todo.id !== state.todo.id;
        })
      });
      this._changeTodo();
    }
  }, {
    key: '_onChangeAllTodo',
    value: function _onChangeAllTodo(state) {
      this.state = Object.assign({}, this.state, {
        todos: this.state.todos.map(function (todo) {
          return Object.assign({}, todo, {
            isCompleted: state.isCompleted
          });
        })
      });
      this._changeTodo();
    }
  }, {
    key: '_onDeleteAllCompletedTodo',
    value: function _onDeleteAllCompletedTodo() {
      this.state = Object.assign({}, this.state, {
        todos: this.state.todos.filter(function (todo) {
          return !todo.isCompleted;
        })
      });
      this._changeTodo();
    }
  }, {
    key: '_changeTodo',
    value: function _changeTodo() {
      this._setLocalStorage();
      this.emit('CHANGE TODO', this.getState());
    }
  }]);

  return Store;
}(_EventEmitter3.default);

exports.default = Store;

},{"./EventEmitter":2,"./utils/getUrlHash":6}],4:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _getUrlHash = require('./utils/getUrlHash');

var _getUrlHash2 = _interopRequireDefault(_getUrlHash);

var _EventEmitter = require('./EventEmitter');

var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

var _Store = require('./Store');

var _Store2 = _interopRequireDefault(_Store);

var _ActionCreator = require('./ActionCreator');

var _ActionCreator2 = _interopRequireDefault(_ActionCreator);

var _Filter = require('./views/Filter');

var _Filter2 = _interopRequireDefault(_Filter);

var _Operation = require('./views/Operation/');

var _Operation2 = _interopRequireDefault(_Operation);

var _Length = require('./views/Length');

var _Length2 = _interopRequireDefault(_Length);

var _Form = require('./views/Todo/Form');

var _Form2 = _interopRequireDefault(_Form);

var _List = require('./views/Todo/List');

var _List2 = _interopRequireDefault(_List);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var dispatcher = new _EventEmitter2.default();
var store = new _Store2.default(dispatcher);
var action = new _ActionCreator2.default(dispatcher);

var TodoApp = function () {
  function TodoApp() {
    _classCallCheck(this, TodoApp);

    this.views = {
      filter: new _Filter2.default(),
      operation: new _Operation2.default(action),
      length: new _Length2.default(),
      todoForm: new _Form2.default(action),
      todoList: new _List2.default(action)
    };

    this._event();
  }

  _createClass(TodoApp, [{
    key: 'start',
    value: function start() {
      var _this = this;

      var state = store.getState();

      Object.keys(this.views).filter(function (key) {
        return typeof _this.views[key].render === 'function';
      }).forEach(function (key) {
        _this.views[key].render(state);
      });
    }
  }, {
    key: '_event',
    value: function _event() {
      window.addEventListener('hashchange', function () {
        action.changeFilter((0, _getUrlHash2.default)());
      }, false);

      store.on('CHANGE FILTER', this._onChangeFilter.bind(this));
      store.on('CHANGE TODO', this._onChangeTodo.bind(this));
    }
  }, {
    key: '_onChangeFilter',
    value: function _onChangeFilter() {
      var state = store.getState();

      this.views.filter.render(state);
      this.views.todoList.render(state);
    }
  }, {
    key: '_onChangeTodo',
    value: function _onChangeTodo(state) {
      this.views.todoList.render(state);
      this.views.operation.render(state);
      this.views.length.render(state);
    }
  }]);

  return TodoApp;
}();

document.addEventListener('DOMContentLoaded', function () {
  var todoApp = new TodoApp();

  todoApp.start();
});

},{"./ActionCreator":1,"./EventEmitter":2,"./Store":3,"./utils/getUrlHash":6,"./views/Filter":7,"./views/Length":8,"./views/Operation/":11,"./views/Todo/Form":12,"./views/Todo/List":18}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (str) {
  var template = document.createElement('div');
  var dom = null;

  template.style.display = 'none';
  template.innerHTML = str;
  document.body.appendChild(template);

  dom = template.childNodes[1];
  document.body.removeChild(template);

  return dom;
};

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getUrlHash = function getUrlHash() {
  var initial = arguments.length <= 0 || arguments[0] === undefined ? 'all' : arguments[0];
  return location.hash.split('#/')[1] || initial;
};

exports.default = getUrlHash;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Filter = function () {
  function Filter() {
    _classCallCheck(this, Filter);

    this.filter = document.querySelector('.js-filter');
  }

  _createClass(Filter, [{
    key: 'render',
    value: function render(state) {
      var filter = state.filter;


      this.filter.innerHTML = filter.list.map(function (item) {
        return '\n      <li>\n        <a class="c-filter__link c-btn c-btn--middle ' + (filter.current === item && 'is-active') + '" href="#/' + item + '">' + item.toUpperCase() + '</a>\n      </li>\n    ';
      }).join('');
    }
  }]);

  return Filter;
}();

exports.default = Filter;

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Length = function () {
  function Length() {
    _classCallCheck(this, Length);

    this.length = document.querySelector('.js-length');
  }

  _createClass(Length, [{
    key: 'render',
    value: function render(state) {
      var todos = state.todos;

      var todoLength = todos.length;
      var completedLength = todos.filter(function (todo) {
        return todo.isCompleted;
      }).length;

      this.length.textContent = completedLength + ' / ' + todoLength;
    }
  }]);

  return Length;
}();

exports.default = Length;

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _getDomNode = require('../../utils/getDomNode');

var _getDomNode2 = _interopRequireDefault(_getDomNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ChangeAllTodoBtn = function () {
  function ChangeAllTodoBtn(action) {
    _classCallCheck(this, ChangeAllTodoBtn);

    this.action = action;
    this.btn = null;
  }

  _createClass(ChangeAllTodoBtn, [{
    key: 'render',
    value: function render(state) {
      var todos = state.todos;

      var todoLen = todos.length;
      var isAllCompleted = todoLen ? todos.every(function (todo) {
        return todo.isCompleted;
      }) : false;

      this.btn = (0, _getDomNode2.default)('\n      <a href="" class="c-btn c-btn--small c-btn--default ' + (todoLen ? '' : 'is-disabled') + '">\n        全て' + (isAllCompleted ? '未' : '') + '完了にする\n      </a>\n    ');

      this.btn.addEventListener('click', this._onClickBtn.bind(this, [todoLen, isAllCompleted]), false);

      return this.btn;
    }
  }, {
    key: '_onClickBtn',
    value: function _onClickBtn(state, e) {
      e.preventDefault();

      var _state = _slicedToArray(state, 2);

      var todoLen = _state[0];
      var isAllCompleted = _state[1];


      if (!todoLen) {
        return;
      }

      this.action.changeAllTodo(!isAllCompleted);
    }
  }]);

  return ChangeAllTodoBtn;
}();

exports.default = ChangeAllTodoBtn;

},{"../../utils/getDomNode":5}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _getDomNode = require('../../utils/getDomNode');

var _getDomNode2 = _interopRequireDefault(_getDomNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DeleteAllTodoBtn = function () {
  function DeleteAllTodoBtn(action) {
    _classCallCheck(this, DeleteAllTodoBtn);

    this.action = action;
    this.btn = null;
  }

  _createClass(DeleteAllTodoBtn, [{
    key: 'render',
    value: function render(state) {
      var existCompleted = state.todos.some(function (todo) {
        return todo.isCompleted;
      });

      this.btn = (0, _getDomNode2.default)('\n      <a href="" class="c-btn c-btn--small c-btn--alert ' + (existCompleted ? '' : 'is-disabled') + '">\n        完了済みを削除する\n      </a>\n    ');

      this.btn.addEventListener('click', this._onClickBtn.bind(this), false);

      return this.btn;
    }
  }, {
    key: '_onClickBtn',
    value: function _onClickBtn(e) {
      e.preventDefault();

      var target = e.target;

      if (target.classList.contains('is-disabled')) {
        return;
      }

      this.action.deleteAllCompletedTodo();
    }
  }]);

  return DeleteAllTodoBtn;
}();

exports.default = DeleteAllTodoBtn;

},{"../../utils/getDomNode":5}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ChangeAllTodoBtn = require('./ChangeAllTodoBtn');

var _ChangeAllTodoBtn2 = _interopRequireDefault(_ChangeAllTodoBtn);

var _DeleteAllTodoBtn = require('./DeleteAllTodoBtn');

var _DeleteAllTodoBtn2 = _interopRequireDefault(_DeleteAllTodoBtn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Operation = function () {
  function Operation(action) {
    _classCallCheck(this, Operation);

    this.action = action;
    this.wrap = document.querySelector('.js-operation');
    this.btnList = [new _ChangeAllTodoBtn2.default(this.action), new _DeleteAllTodoBtn2.default(this.action)];
  }

  _createClass(Operation, [{
    key: 'render',
    value: function render(state) {
      var _this = this;

      this.wrap.innerHTML = '';
      this.btnList.forEach(function (btn) {
        var li = document.createElement('li');

        li.appendChild(btn.render(state));
        _this.wrap.appendChild(li);
      });
    }
  }]);

  return Operation;
}();

exports.default = Operation;

},{"./ChangeAllTodoBtn":9,"./DeleteAllTodoBtn":10}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TodoForm = function () {
  function TodoForm(action) {
    _classCallCheck(this, TodoForm);

    this.action = action;
    this.form = document.querySelector('.js-todo-form');

    this.form.addEventListener('submit', this.onSubmit.bind(this), false);
  }

  _createClass(TodoForm, [{
    key: 'onSubmit',
    value: function onSubmit(e) {
      e.preventDefault();

      var input = e.target.todo;

      this.action.addTodo({
        isCompleted: false,
        content: input.value
      });
      input.value = '';
    }
  }]);

  return TodoForm;
}();

exports.default = TodoForm;

},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _getDomNode = require('../../../../utils/getDomNode');

var _getDomNode2 = _interopRequireDefault(_getDomNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CheckBox = function () {
  function CheckBox(action) {
    _classCallCheck(this, CheckBox);

    this.action = action;
    this.checkbox = null;
  }

  _createClass(CheckBox, [{
    key: 'render',
    value: function render(todo) {
      this.checkbox = (0, _getDomNode2.default)('\n      <input type="checkbox" class="c-input--checkbox__check js-check" ' + (todo.isCompleted ? 'checked' : '') + '>\n    ');

      this.checkbox.addEventListener('change', this._onChangeComplete.bind(this, todo), false);

      return this.checkbox;
    }
  }, {
    key: '_onChangeComplete',
    value: function _onChangeComplete(todo, e) {
      this.action.editTodo(Object.assign({}, todo, {
        isCompleted: e.target.checked
      }));
    }
  }]);

  return CheckBox;
}();

exports.default = CheckBox;

},{"../../../../utils/getDomNode":5}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _getDomNode = require('../../../../utils/getDomNode');

var _getDomNode2 = _interopRequireDefault(_getDomNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Content = function () {
  function Content(action) {
    _classCallCheck(this, Content);

    this.action = action;
    this.content = null;
    this.txt = null;
  }

  _createClass(Content, [{
    key: 'render',
    value: function render(todo) {
      this.content = (0, _getDomNode2.default)('\n      <form class="c-input--checkbox__body">\n        <span class="c-input--checkbox__body__content">' + todo.content + '</span>\n      </form>\n    ');
      this.txt = this.content.childNodes[1];

      this.content.addEventListener('submit', this._onEditTodoContent.bind(this, todo), false);

      return this.content;
    }
  }, {
    key: '_onEditTodoContent',
    value: function _onEditTodoContent(todo, e) {
      e.preventDefault();

      this.action.editTodo(Object.assign({}, todo, {
        content: e.target.todo.value
      }));
      this.txt.removeEventListener('keyup', this, false);
    }
  }, {
    key: 'renderEditor',
    value: function renderEditor(todo) {
      this.txt.innerHTML = '<input class="c-input c-input--small" type="text" name="todo" value="' + todo.content + '" required>';
      this.txt.querySelector('input').focus();
      this.txt.addEventListener('keyup', this, false);
      this.todo = todo;
    }
  }, {
    key: 'handleEvent',
    value: function handleEvent(e) {
      if (e.type === 'keyup' && e.keyCode === 27) {
        this._cancelEdit();
      }
    }
  }, {
    key: '_cancelEdit',
    value: function _cancelEdit() {
      this.txt.removeEventListener('keyup', this, false);
      this.txt.innerHTML = this.todo.content;
    }
  }]);

  return Content;
}();

exports.default = Content;

},{"../../../../utils/getDomNode":5}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _getDomNode = require('../../../../utils/getDomNode');

var _getDomNode2 = _interopRequireDefault(_getDomNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DeleteIcon = function () {
  function DeleteIcon(action) {
    _classCallCheck(this, DeleteIcon);

    this.action = action;
    this.wrap = document.createElement('li');
    this.icon = null;
  }

  _createClass(DeleteIcon, [{
    key: 'render',
    value: function render(todo) {
      this.icon = (0, _getDomNode2.default)('\n      <i class="c-icon is-trash"></i>\n    ');
      this.wrap.appendChild(this.icon);

      this.icon.addEventListener('click', this._onDeleteTodo.bind(this, todo), false);

      return this.wrap;
    }
  }, {
    key: '_onDeleteTodo',
    value: function _onDeleteTodo(todo) {
      this.action.deleteTodo(todo);
    }
  }]);

  return DeleteIcon;
}();

exports.default = DeleteIcon;

},{"../../../../utils/getDomNode":5}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _getDomNode = require('../../../../utils/getDomNode');

var _getDomNode2 = _interopRequireDefault(_getDomNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EditIcon = function () {
  function EditIcon(action) {
    _classCallCheck(this, EditIcon);

    this.action = action;
    this.wrap = document.createElement('li');
    this.icon = null;
  }

  _createClass(EditIcon, [{
    key: 'render',
    value: function render(todo, onEditTodo, parent) {
      this.icon = (0, _getDomNode2.default)('\n      <i class="c-icon is-pencil">\n    ');
      this.wrap.appendChild(this.icon);

      this.icon.addEventListener('click', onEditTodo.bind(parent, todo), false);

      return this.wrap;
    }
  }]);

  return EditIcon;
}();

exports.default = EditIcon;

},{"../../../../utils/getDomNode":5}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CheckBox = require('./CheckBox');

var _CheckBox2 = _interopRequireDefault(_CheckBox);

var _Content = require('./Content');

var _Content2 = _interopRequireDefault(_Content);

var _DeleteIcon = require('./DeleteIcon');

var _DeleteIcon2 = _interopRequireDefault(_DeleteIcon);

var _EditIcon = require('./EditIcon');

var _EditIcon2 = _interopRequireDefault(_EditIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TodoItem = function () {
  function TodoItem(action) {
    _classCallCheck(this, TodoItem);

    this.action = action;
    this.item = document.createElement('li');

    this.checkBox = new _CheckBox2.default(action);
    this.content = new _Content2.default(action);
    this.deleteIcon = new _DeleteIcon2.default(action);
    this.editIcon = new _EditIcon2.default(action);
  }

  _createClass(TodoItem, [{
    key: 'render',
    value: function render(todo) {
      this.item.id = todo.id;
      this.item.innerHTML = '\n      <div class="c-todoItem">\n        <label class="c-todoItem__body c-input--checkbox js-label"></label>\n\n        <ul class="c-todoItem__info js-info"></ul>\n      </div>\n    ';

      var label = this.item.querySelector('.js-label');
      var info = this.item.querySelector('.js-info');

      label.appendChild(this.checkBox.render(todo));
      label.appendChild(this.content.render(todo));
      info.appendChild(this.editIcon.render(todo, this.onEditTodo, this));
      info.appendChild(this.deleteIcon.render(todo));

      return this.item;
    }
  }, {
    key: 'onEditTodo',
    value: function onEditTodo(todo) {
      this.content.renderEditor(todo);
    }
  }]);

  return TodoItem;
}();

exports.default = TodoItem;

},{"./CheckBox":13,"./Content":14,"./DeleteIcon":15,"./EditIcon":16}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Item = require('./Item/');

var _Item2 = _interopRequireDefault(_Item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TodoList = function () {
  function TodoList(action) {
    _classCallCheck(this, TodoList);

    this.action = action;
    this.list = document.querySelector('.js-todo-list');
  }

  _createClass(TodoList, [{
    key: 'render',
    value: function render(state) {
      var todos = state.todos;
      var filter = state.filter;


      this.list.innerHTML = '';
      todos.filter(function (todo) {
        switch (filter.current) {
          case 'active':
            return !todo.isCompleted;

          case 'completed':
            return todo.isCompleted;

          case 'all':
          default:
            return todo;
        }
      }).forEach(this._add.bind(this));
    }
  }, {
    key: '_add',
    value: function _add(todo) {
      var todoItem = new _Item2.default(this.action);

      this.list.appendChild(todoItem.render(todo));
    }
  }]);

  return TodoList;
}();

exports.default = TodoList;

},{"./Item/":17}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvamF2YXNjcmlwdHMvQWN0aW9uQ3JlYXRvci5qcyIsInNyYy9qYXZhc2NyaXB0cy9FdmVudEVtaXR0ZXIuanMiLCJzcmMvamF2YXNjcmlwdHMvU3RvcmUuanMiLCJzcmMvamF2YXNjcmlwdHMvYXBwLmpzIiwic3JjL2phdmFzY3JpcHRzL3V0aWxzL2dldERvbU5vZGUuanMiLCJzcmMvamF2YXNjcmlwdHMvdXRpbHMvZ2V0VXJsSGFzaC5qcyIsInNyYy9qYXZhc2NyaXB0cy92aWV3cy9GaWx0ZXIuanMiLCJzcmMvamF2YXNjcmlwdHMvdmlld3MvTGVuZ3RoLmpzIiwic3JjL2phdmFzY3JpcHRzL3ZpZXdzL09wZXJhdGlvbi9DaGFuZ2VBbGxUb2RvQnRuLmpzIiwic3JjL2phdmFzY3JpcHRzL3ZpZXdzL09wZXJhdGlvbi9EZWxldGVBbGxUb2RvQnRuLmpzIiwic3JjL2phdmFzY3JpcHRzL3ZpZXdzL09wZXJhdGlvbi9pbmRleC5qcyIsInNyYy9qYXZhc2NyaXB0cy92aWV3cy9Ub2RvL0Zvcm0uanMiLCJzcmMvamF2YXNjcmlwdHMvdmlld3MvVG9kby9MaXN0L0l0ZW0vQ2hlY2tCb3guanMiLCJzcmMvamF2YXNjcmlwdHMvdmlld3MvVG9kby9MaXN0L0l0ZW0vQ29udGVudC5qcyIsInNyYy9qYXZhc2NyaXB0cy92aWV3cy9Ub2RvL0xpc3QvSXRlbS9EZWxldGVJY29uLmpzIiwic3JjL2phdmFzY3JpcHRzL3ZpZXdzL1RvZG8vTGlzdC9JdGVtL0VkaXRJY29uLmpzIiwic3JjL2phdmFzY3JpcHRzL3ZpZXdzL1RvZG8vTGlzdC9JdGVtL2luZGV4LmpzIiwic3JjL2phdmFzY3JpcHRzL3ZpZXdzL1RvZG8vTGlzdC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7SUNBcUIsYTtBQUNuQix5QkFBWSxVQUFaLEVBQXdCO0FBQUE7O0FBQ3RCLFNBQUss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RUFBTTtBQUNULFVBQU0sV0FBVyxtQkFBYSxLQUFLLE1BQWxCLENBQWpCOztBQUVBLFdBQUssSUFBTCxDQUFVLFdBQVYsQ0FBc0IsU0FBUyxNQUFULENBQWdCLElBQWhCLENBQXRCO0FBQ0Q7Ozs7OztrQkE3QmtCLFEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWN0aW9uQ3JlYXRvciB7XG4gIGNvbnN0cnVjdG9yKGRpc3BhdGNoZXIpIHtcbiAgICB0aGlzLmRpc3BhdGNoZXIgPSBkaXNwYXRjaGVyO1xuICB9XG5cbiAgY2hhbmdlRmlsdGVyKGhhc2gpIHtcbiAgICB0aGlzLmRpc3BhdGNoZXIuZW1pdCgnY2hhbmdlRmlsdGVyJywgeyBoYXNoIH0pO1xuICB9XG5cbiAgYWRkVG9kbyh0b2RvKSB7XG4gICAgdGhpcy5kaXNwYXRjaGVyLmVtaXQoJ2FkZFRvZG8nLCB7IHRvZG8gfSk7XG4gIH1cblxuICBlZGl0VG9kbyh0b2RvKSB7XG4gICAgdGhpcy5kaXNwYXRjaGVyLmVtaXQoJ2VkaXRUb2RvJywgeyB0b2RvIH0pO1xuICB9XG5cbiAgZGVsZXRlVG9kbyh0b2RvKSB7XG4gICAgdGhpcy5kaXNwYXRjaGVyLmVtaXQoJ2RlbGV0ZVRvZG8nLCB7IHRvZG8gfSk7XG4gIH1cblxuICBjaGFuZ2VBbGxUb2RvKGlzQ29tcGxldGVkKSB7XG4gICAgdGhpcy5kaXNwYXRjaGVyLmVtaXQoJ2NoYW5nZUFsbFRvZG8nLCB7IGlzQ29tcGxldGVkIH0pO1xuICB9XG5cbiAgZGVsZXRlQWxsQ29tcGxldGVkVG9kbygpIHtcbiAgICB0aGlzLmRpc3BhdGNoZXIuZW1pdCgnZGVsZXRlQWxsQ29tcGxldGVkVG9kbycpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudEVtaXR0ZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9oYW5kbGVycyA9IHt9O1xuICB9XG5cbiAgb24odHlwZSwgaGFuZGxlcikge1xuICAgIGlmICh0eXBlb2YgdGhpcy5faGFuZGxlcnNbdHlwZV0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLl9oYW5kbGVyc1t0eXBlXSA9IFtdO1xuICAgIH1cblxuICAgIHRoaXMuX2hhbmRsZXJzW3R5cGVdLnB1c2goaGFuZGxlcik7XG4gIH1cblxuICBvZmYodHlwZSwgaGFuZGxlcikge1xuICAgIGNvbnN0IGhhbmRsZXJzID0gdGhpcy5faGFuZGxlcnNbdHlwZV0gfHwgW107XG5cbiAgICBoYW5kbGVycy5mb3JFYWNoKChteUhhbmRsZXIsIGkpID0+IHtcbiAgICAgIGlmIChteUhhbmRsZXIgPT09IGhhbmRsZXIpIHtcbiAgICAgICAgaGFuZGxlcnMuc3BsaWNlKGksIDEpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZW1pdCh0eXBlLCBkYXRhKSB7XG4gICAgY29uc3QgaGFuZGxlcnMgPSB0aGlzLl9oYW5kbGVyc1t0eXBlXSB8fCBbXTtcblxuICAgIGhhbmRsZXJzLmZvckVhY2goaGFuZGxlciA9PiB7XG4gICAgICBoYW5kbGVyLmNhbGwodGhpcywgZGF0YSk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnLi9FdmVudEVtaXR0ZXInO1xuaW1wb3J0IGdldFVybEhhc2ggZnJvbSAnLi91dGlscy9nZXRVcmxIYXNoJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RvcmUgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICBjb25zdHJ1Y3RvcihkaXNwYXRjaGVyKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBmaWx0ZXI6IHtcbiAgICAgICAgY3VycmVudDogZ2V0VXJsSGFzaCgpLFxuICAgICAgICBsaXN0OiBbJ2FsbCcsICdhY3RpdmUnLCAnY29tcGxldGVkJ11cbiAgICAgIH0sXG4gICAgICB0b2RvczogdGhpcy5fZ2V0TG9jYWxTdG9yYWdlKCd0b2RvcycpIHx8IFtdXG4gICAgfTtcblxuICAgIGRpc3BhdGNoZXIub24oJ2NoYW5nZUZpbHRlcicsIDo6dGhpcy5fb25DaGFuZ2VGaWx0ZXIpO1xuICAgIGRpc3BhdGNoZXIub24oJ2FkZFRvZG8nLCA6OnRoaXMuX29uQWRkVG9kbyk7XG4gICAgZGlzcGF0Y2hlci5vbignZWRpdFRvZG8nLCA6OnRoaXMuX29uRWRpdFRvZG8pO1xuICAgIGRpc3BhdGNoZXIub24oJ2RlbGV0ZVRvZG8nLCA6OnRoaXMuX29uRGVsZXRlVG9kbyk7XG4gICAgZGlzcGF0Y2hlci5vbignY2hhbmdlQWxsVG9kbycsIDo6dGhpcy5fb25DaGFuZ2VBbGxUb2RvKTtcbiAgICBkaXNwYXRjaGVyLm9uKCdkZWxldGVBbGxDb21wbGV0ZWRUb2RvJywgOjp0aGlzLl9vbkRlbGV0ZUFsbENvbXBsZXRlZFRvZG8pO1xuICB9XG5cbiAgZ2V0U3RhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGU7XG4gIH1cblxuICBfZ2V0TG9jYWxTdG9yYWdlKHN0cikge1xuICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKHN0cikpO1xuICB9XG5cbiAgX3NldExvY2FsU3RvcmFnZSgpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kb3MnLCBKU09OLnN0cmluZ2lmeSh0aGlzLnN0YXRlLnRvZG9zKSk7XG4gIH1cblxuICBfb25DaGFuZ2VGaWx0ZXIoc3RhdGUpIHtcbiAgICB0aGlzLnN0YXRlID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5zdGF0ZSwge1xuICAgICAgZmlsdGVyOiB7XG4gICAgICAgIGN1cnJlbnQ6IHN0YXRlLmhhc2gsXG4gICAgICAgIGxpc3Q6IHRoaXMuc3RhdGUuZmlsdGVyLmxpc3RcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmVtaXQoJ0NIQU5HRSBGSUxURVInKTtcbiAgfVxuXG4gIF9vbkFkZFRvZG8oc3RhdGUpIHtcbiAgICBjb25zdCB0b2RvID0gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUudG9kbywge1xuICAgICAgaWQ6IHRoaXMuX2dldFVuaXF1ZVN0cmluZygpXG4gICAgfSk7XG5cbiAgICB0aGlzLnN0YXRlID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5zdGF0ZSwge1xuICAgICAgdG9kb3M6IFtcbiAgICAgICAgLi4udGhpcy5zdGF0ZS50b2RvcyxcbiAgICAgICAgdG9kb1xuICAgICAgXVxuICAgIH0pO1xuICAgIHRoaXMuX2NoYW5nZVRvZG8oKTtcbiAgfVxuXG4gIF9nZXRVbmlxdWVTdHJpbmcoKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpLnRvU3RyaW5nKDE2KSArIE1hdGguZmxvb3IoMTAwMCAqIE1hdGgucmFuZG9tKCkpLnRvU3RyaW5nKDE2KTtcbiAgfVxuXG4gIF9vbkVkaXRUb2RvKHN0YXRlKSB7XG4gICAgdGhpcy5zdGF0ZSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc3RhdGUsIHtcbiAgICAgIHRvZG9zOiB0aGlzLnN0YXRlLnRvZG9zLm1hcCh0b2RvID0+IHtcbiAgICAgICAgaWYgKHRvZG8uaWQgPT09IHN0YXRlLnRvZG8uaWQpIHtcbiAgICAgICAgICByZXR1cm4gc3RhdGUudG9kbztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0b2RvO1xuICAgICAgfSlcbiAgICB9KTtcbiAgICB0aGlzLl9jaGFuZ2VUb2RvKCk7XG4gIH1cblxuICBfb25EZWxldGVUb2RvKHN0YXRlKSB7XG4gICAgdGhpcy5zdGF0ZSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc3RhdGUsIHtcbiAgICAgIHRvZG9zOiB0aGlzLnN0YXRlLnRvZG9zLmZpbHRlcih0b2RvID0+IHRvZG8uaWQgIT09IHN0YXRlLnRvZG8uaWQpXG4gICAgfSk7XG4gICAgdGhpcy5fY2hhbmdlVG9kbygpO1xuICB9XG5cbiAgX29uQ2hhbmdlQWxsVG9kbyhzdGF0ZSkge1xuICAgIHRoaXMuc3RhdGUgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnN0YXRlLCB7XG4gICAgICB0b2RvczogdGhpcy5zdGF0ZS50b2Rvcy5tYXAodG9kbyA9PiBPYmplY3QuYXNzaWduKHt9LCB0b2RvLCB7XG4gICAgICAgIGlzQ29tcGxldGVkOiBzdGF0ZS5pc0NvbXBsZXRlZFxuICAgICAgfSkpXG4gICAgfSk7XG4gICAgdGhpcy5fY2hhbmdlVG9kbygpO1xuICB9XG5cbiAgX29uRGVsZXRlQWxsQ29tcGxldGVkVG9kbygpIHtcbiAgICB0aGlzLnN0YXRlID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5zdGF0ZSwge1xuICAgICAgdG9kb3M6IHRoaXMuc3RhdGUudG9kb3MuZmlsdGVyKHRvZG8gPT4gIXRvZG8uaXNDb21wbGV0ZWQpXG4gICAgfSk7XG4gICAgdGhpcy5fY2hhbmdlVG9kbygpO1xuICB9XG5cbiAgX2NoYW5nZVRvZG8oKSB7XG4gICAgdGhpcy5fc2V0TG9jYWxTdG9yYWdlKCk7XG4gICAgdGhpcy5lbWl0KCdDSEFOR0UgVE9ETycsIHRoaXMuZ2V0U3RhdGUoKSk7XG4gIH1cbn1cbiIsImltcG9ydCBnZXRVcmxIYXNoIGZyb20gJy4vdXRpbHMvZ2V0VXJsSGFzaCc7XG5cbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnLi9FdmVudEVtaXR0ZXInO1xuaW1wb3J0IFN0b3JlIGZyb20gJy4vU3RvcmUnO1xuaW1wb3J0IEFjdGlvbkNyZWF0b3IgZnJvbSAnLi9BY3Rpb25DcmVhdG9yJztcblxuaW1wb3J0IEZpbHRlciBmcm9tICcuL3ZpZXdzL0ZpbHRlcic7XG5pbXBvcnQgT3BlcmF0aW9uIGZyb20gJy4vdmlld3MvT3BlcmF0aW9uLyc7XG5pbXBvcnQgTGVuZ3RoIGZyb20gJy4vdmlld3MvTGVuZ3RoJztcbmltcG9ydCBUb2RvRm9ybSBmcm9tICcuL3ZpZXdzL1RvZG8vRm9ybSc7XG5pbXBvcnQgVG9kb0xpc3QgZnJvbSAnLi92aWV3cy9Ub2RvL0xpc3QnO1xuXG5jb25zdCBkaXNwYXRjaGVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuY29uc3Qgc3RvcmUgPSBuZXcgU3RvcmUoZGlzcGF0Y2hlcik7XG5jb25zdCBhY3Rpb24gPSBuZXcgQWN0aW9uQ3JlYXRvcihkaXNwYXRjaGVyKTtcblxuY2xhc3MgVG9kb0FwcCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMudmlld3MgPSB7XG4gICAgICBmaWx0ZXI6IG5ldyBGaWx0ZXIoKSxcbiAgICAgIG9wZXJhdGlvbjogbmV3IE9wZXJhdGlvbihhY3Rpb24pLFxuICAgICAgbGVuZ3RoOiBuZXcgTGVuZ3RoKCksXG4gICAgICB0b2RvRm9ybTogbmV3IFRvZG9Gb3JtKGFjdGlvbiksXG4gICAgICB0b2RvTGlzdDogbmV3IFRvZG9MaXN0KGFjdGlvbilcbiAgICB9O1xuXG4gICAgdGhpcy5fZXZlbnQoKTtcbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIGNvbnN0IHN0YXRlID0gc3RvcmUuZ2V0U3RhdGUoKTtcblxuICAgIE9iamVjdC5rZXlzKHRoaXMudmlld3MpLmZpbHRlcihrZXkgPT4gdHlwZW9mIHRoaXMudmlld3Nba2V5XS5yZW5kZXIgPT09ICdmdW5jdGlvbicpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIHRoaXMudmlld3Nba2V5XS5yZW5kZXIoc3RhdGUpO1xuICAgIH0pO1xuICB9XG5cbiAgX2V2ZW50KCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgKCkgPT4geyBhY3Rpb24uY2hhbmdlRmlsdGVyKGdldFVybEhhc2goKSk7IH0sIGZhbHNlKTtcblxuICAgIHN0b3JlLm9uKCdDSEFOR0UgRklMVEVSJywgOjp0aGlzLl9vbkNoYW5nZUZpbHRlcik7XG4gICAgc3RvcmUub24oJ0NIQU5HRSBUT0RPJywgOjp0aGlzLl9vbkNoYW5nZVRvZG8pO1xuICB9XG5cbiAgX29uQ2hhbmdlRmlsdGVyKCkge1xuICAgIGNvbnN0IHN0YXRlID0gc3RvcmUuZ2V0U3RhdGUoKTtcblxuICAgIHRoaXMudmlld3MuZmlsdGVyLnJlbmRlcihzdGF0ZSk7XG4gICAgdGhpcy52aWV3cy50b2RvTGlzdC5yZW5kZXIoc3RhdGUpO1xuICB9XG5cbiAgX29uQ2hhbmdlVG9kbyhzdGF0ZSkge1xuICAgIHRoaXMudmlld3MudG9kb0xpc3QucmVuZGVyKHN0YXRlKTtcbiAgICB0aGlzLnZpZXdzLm9wZXJhdGlvbi5yZW5kZXIoc3RhdGUpO1xuICAgIHRoaXMudmlld3MubGVuZ3RoLnJlbmRlcihzdGF0ZSk7XG4gIH1cbn1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgY29uc3QgdG9kb0FwcCA9IG5ldyBUb2RvQXBwKCk7XG5cbiAgdG9kb0FwcC5zdGFydCgpO1xufSk7XG4iLCJleHBvcnQgZGVmYXVsdCBzdHIgPT4ge1xuICBjb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBsZXQgZG9tID0gbnVsbDtcblxuICB0ZW1wbGF0ZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICB0ZW1wbGF0ZS5pbm5lckhUTUwgPSBzdHI7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGVtcGxhdGUpO1xuXG4gIGRvbSA9IHRlbXBsYXRlLmNoaWxkTm9kZXNbMV07XG4gIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGVtcGxhdGUpO1xuXG4gIHJldHVybiBkb207XG59O1xuIiwiY29uc3QgZ2V0VXJsSGFzaCA9IChpbml0aWFsID0gJ2FsbCcpID0+IGxvY2F0aW9uLmhhc2guc3BsaXQoJyMvJylbMV0gfHwgaW5pdGlhbDtcblxuZXhwb3J0IGRlZmF1bHQgZ2V0VXJsSGFzaDtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpbHRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZmlsdGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWZpbHRlcicpO1xuICB9XG5cbiAgcmVuZGVyKHN0YXRlKSB7XG4gICAgY29uc3QgeyBmaWx0ZXIgfSA9IHN0YXRlO1xuXG4gICAgdGhpcy5maWx0ZXIuaW5uZXJIVE1MID0gZmlsdGVyLmxpc3QubWFwKGl0ZW0gPT4gYFxuICAgICAgPGxpPlxuICAgICAgICA8YSBjbGFzcz1cImMtZmlsdGVyX19saW5rIGMtYnRuIGMtYnRuLS1taWRkbGUgJHtmaWx0ZXIuY3VycmVudCA9PT0gaXRlbSAmJiAnaXMtYWN0aXZlJ31cIiBocmVmPVwiIy8ke2l0ZW19XCI+JHtpdGVtLnRvVXBwZXJDYXNlKCl9PC9hPlxuICAgICAgPC9saT5cbiAgICBgKS5qb2luKCcnKTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGVuZ3RoIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5sZW5ndGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtbGVuZ3RoJyk7XG4gIH1cblxuICByZW5kZXIoc3RhdGUpIHtcbiAgICBjb25zdCB7IHRvZG9zIH0gPSBzdGF0ZTtcbiAgICBjb25zdCB0b2RvTGVuZ3RoID0gdG9kb3MubGVuZ3RoO1xuICAgIGNvbnN0IGNvbXBsZXRlZExlbmd0aCA9IHRvZG9zLmZpbHRlcih0b2RvID0+IHRvZG8uaXNDb21wbGV0ZWQpLmxlbmd0aDtcblxuICAgIHRoaXMubGVuZ3RoLnRleHRDb250ZW50ID0gYCR7Y29tcGxldGVkTGVuZ3RofSAvICR7dG9kb0xlbmd0aH1gO1xuICB9XG59XG4iLCJpbXBvcnQgZ2V0RG9tTm9kZSBmcm9tICcuLi8uLi91dGlscy9nZXREb21Ob2RlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hhbmdlQWxsVG9kb0J0biB7XG4gIGNvbnN0cnVjdG9yKGFjdGlvbikge1xuICAgIHRoaXMuYWN0aW9uID0gYWN0aW9uO1xuICAgIHRoaXMuYnRuID0gbnVsbDtcbiAgfVxuXG4gIHJlbmRlcihzdGF0ZSkge1xuICAgIGNvbnN0IHsgdG9kb3MgfSA9IHN0YXRlO1xuICAgIGNvbnN0IHRvZG9MZW4gPSB0b2Rvcy5sZW5ndGg7XG4gICAgY29uc3QgaXNBbGxDb21wbGV0ZWQgPSB0b2RvTGVuID8gdG9kb3MuZXZlcnkodG9kbyA9PiB0b2RvLmlzQ29tcGxldGVkKSA6IGZhbHNlO1xuXG4gICAgdGhpcy5idG4gPSBnZXREb21Ob2RlKGBcbiAgICAgIDxhIGhyZWY9XCJcIiBjbGFzcz1cImMtYnRuIGMtYnRuLS1zbWFsbCBjLWJ0bi0tZGVmYXVsdCAke3RvZG9MZW4gPyAnJyA6ICdpcy1kaXNhYmxlZCd9XCI+XG4gICAgICAgIOWFqOOBpiR7aXNBbGxDb21wbGV0ZWQgPyAn5pyqJyA6ICcnfeWujOS6huOBq+OBmeOCi1xuICAgICAgPC9hPlxuICAgIGApO1xuXG4gICAgdGhpcy5idG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9vbkNsaWNrQnRuLmJpbmQodGhpcywgW3RvZG9MZW4sIGlzQWxsQ29tcGxldGVkXSksIGZhbHNlKTtcblxuICAgIHJldHVybiB0aGlzLmJ0bjtcbiAgfVxuXG4gIF9vbkNsaWNrQnRuKHN0YXRlLCBlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgY29uc3QgW3RvZG9MZW4sIGlzQWxsQ29tcGxldGVkXSA9IHN0YXRlO1xuXG4gICAgaWYgKCF0b2RvTGVuKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5hY3Rpb24uY2hhbmdlQWxsVG9kbyghaXNBbGxDb21wbGV0ZWQpO1xuICB9XG59XG4iLCJpbXBvcnQgZ2V0RG9tTm9kZSBmcm9tICcuLi8uLi91dGlscy9nZXREb21Ob2RlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVsZXRlQWxsVG9kb0J0biB7XG4gIGNvbnN0cnVjdG9yKGFjdGlvbikge1xuICAgIHRoaXMuYWN0aW9uID0gYWN0aW9uO1xuICAgIHRoaXMuYnRuID0gbnVsbDtcbiAgfVxuXG4gIHJlbmRlcihzdGF0ZSkge1xuICAgIGNvbnN0IGV4aXN0Q29tcGxldGVkID0gc3RhdGUudG9kb3Muc29tZSh0b2RvID0+IHRvZG8uaXNDb21wbGV0ZWQpO1xuXG4gICAgdGhpcy5idG4gPSBnZXREb21Ob2RlKGBcbiAgICAgIDxhIGhyZWY9XCJcIiBjbGFzcz1cImMtYnRuIGMtYnRuLS1zbWFsbCBjLWJ0bi0tYWxlcnQgJHtleGlzdENvbXBsZXRlZCA/ICcnIDogJ2lzLWRpc2FibGVkJ31cIj5cbiAgICAgICAg5a6M5LqG5riI44G/44KS5YmK6Zmk44GZ44KLXG4gICAgICA8L2E+XG4gICAgYCk7XG5cbiAgICB0aGlzLmJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIDo6dGhpcy5fb25DbGlja0J0biwgZmFsc2UpO1xuXG4gICAgcmV0dXJuIHRoaXMuYnRuO1xuICB9XG5cbiAgX29uQ2xpY2tCdG4oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xuXG4gICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2lzLWRpc2FibGVkJykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmFjdGlvbi5kZWxldGVBbGxDb21wbGV0ZWRUb2RvKCk7XG4gIH1cbn1cbiIsImltcG9ydCBDaGFuZ2VBbGxUb2RvQnRuIGZyb20gJy4vQ2hhbmdlQWxsVG9kb0J0bic7XG5pbXBvcnQgRGVsZXRlQWxsVG9kb0J0biBmcm9tICcuL0RlbGV0ZUFsbFRvZG9CdG4nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcGVyYXRpb24ge1xuICBjb25zdHJ1Y3RvcihhY3Rpb24pIHtcbiAgICB0aGlzLmFjdGlvbiA9IGFjdGlvbjtcbiAgICB0aGlzLndyYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtb3BlcmF0aW9uJyk7XG4gICAgdGhpcy5idG5MaXN0ID0gW1xuICAgICAgbmV3IENoYW5nZUFsbFRvZG9CdG4odGhpcy5hY3Rpb24pLFxuICAgICAgbmV3IERlbGV0ZUFsbFRvZG9CdG4odGhpcy5hY3Rpb24pXG4gICAgXTtcbiAgfVxuXG4gIHJlbmRlcihzdGF0ZSkge1xuICAgIHRoaXMud3JhcC5pbm5lckhUTUwgPSAnJztcbiAgICB0aGlzLmJ0bkxpc3QuZm9yRWFjaChidG4gPT4ge1xuICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuXG4gICAgICBsaS5hcHBlbmRDaGlsZChidG4ucmVuZGVyKHN0YXRlKSk7XG4gICAgICB0aGlzLndyYXAuYXBwZW5kQ2hpbGQobGkpO1xuICAgIH0pO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUb2RvRm9ybSB7XG4gIGNvbnN0cnVjdG9yKGFjdGlvbikge1xuICAgIHRoaXMuYWN0aW9uID0gYWN0aW9uO1xuICAgIHRoaXMuZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy10b2RvLWZvcm0nKTtcblxuICAgIHRoaXMuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCA6OnRoaXMub25TdWJtaXQsIGZhbHNlKTtcbiAgfVxuXG4gIG9uU3VibWl0KGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBjb25zdCBpbnB1dCA9IGUudGFyZ2V0LnRvZG87XG5cbiAgICB0aGlzLmFjdGlvbi5hZGRUb2RvKHtcbiAgICAgIGlzQ29tcGxldGVkOiBmYWxzZSxcbiAgICAgIGNvbnRlbnQ6IGlucHV0LnZhbHVlXG4gICAgfSk7XG4gICAgaW5wdXQudmFsdWUgPSAnJztcbiAgfVxufVxuIiwiaW1wb3J0IGdldERvbU5vZGUgZnJvbSAnLi4vLi4vLi4vLi4vdXRpbHMvZ2V0RG9tTm9kZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoZWNrQm94IHtcbiAgY29uc3RydWN0b3IoYWN0aW9uKSB7XG4gICAgdGhpcy5hY3Rpb24gPSBhY3Rpb247XG4gICAgdGhpcy5jaGVja2JveCA9IG51bGw7XG4gIH1cblxuICByZW5kZXIodG9kbykge1xuICAgIHRoaXMuY2hlY2tib3ggPSBnZXREb21Ob2RlKGBcbiAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjbGFzcz1cImMtaW5wdXQtLWNoZWNrYm94X19jaGVjayBqcy1jaGVja1wiICR7dG9kby5pc0NvbXBsZXRlZCA/ICdjaGVja2VkJyA6ICcnfT5cbiAgICBgKTtcblxuICAgIHRoaXMuY2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5fb25DaGFuZ2VDb21wbGV0ZS5iaW5kKHRoaXMsIHRvZG8pLCBmYWxzZSk7XG5cbiAgICByZXR1cm4gdGhpcy5jaGVja2JveDtcbiAgfVxuXG4gIF9vbkNoYW5nZUNvbXBsZXRlKHRvZG8sIGUpIHtcbiAgICB0aGlzLmFjdGlvbi5lZGl0VG9kbyhPYmplY3QuYXNzaWduKHt9LCB0b2RvLCB7XG4gICAgICBpc0NvbXBsZXRlZDogZS50YXJnZXQuY2hlY2tlZFxuICAgIH0pKTtcbiAgfVxufVxuIiwiaW1wb3J0IGdldERvbU5vZGUgZnJvbSAnLi4vLi4vLi4vLi4vdXRpbHMvZ2V0RG9tTm9kZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnQge1xuICBjb25zdHJ1Y3RvcihhY3Rpb24pIHtcbiAgICB0aGlzLmFjdGlvbiA9IGFjdGlvbjtcbiAgICB0aGlzLmNvbnRlbnQgPSBudWxsO1xuICAgIHRoaXMudHh0ID0gbnVsbDtcbiAgfVxuXG4gIHJlbmRlcih0b2RvKSB7XG4gICAgdGhpcy5jb250ZW50ID0gZ2V0RG9tTm9kZShgXG4gICAgICA8Zm9ybSBjbGFzcz1cImMtaW5wdXQtLWNoZWNrYm94X19ib2R5XCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiYy1pbnB1dC0tY2hlY2tib3hfX2JvZHlfX2NvbnRlbnRcIj4ke3RvZG8uY29udGVudH08L3NwYW4+XG4gICAgICA8L2Zvcm0+XG4gICAgYCk7XG4gICAgdGhpcy50eHQgPSB0aGlzLmNvbnRlbnQuY2hpbGROb2Rlc1sxXTtcblxuICAgIHRoaXMuY29udGVudC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzLl9vbkVkaXRUb2RvQ29udGVudC5iaW5kKHRoaXMsIHRvZG8pLCBmYWxzZSk7XG5cbiAgICByZXR1cm4gdGhpcy5jb250ZW50O1xuICB9XG5cbiAgX29uRWRpdFRvZG9Db250ZW50KHRvZG8sIGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICB0aGlzLmFjdGlvbi5lZGl0VG9kbyhPYmplY3QuYXNzaWduKHt9LCB0b2RvLCB7XG4gICAgICBjb250ZW50OiBlLnRhcmdldC50b2RvLnZhbHVlXG4gICAgfSkpO1xuICAgIHRoaXMudHh0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcywgZmFsc2UpO1xuICB9XG5cbiAgcmVuZGVyRWRpdG9yKHRvZG8pIHtcbiAgICB0aGlzLnR4dC5pbm5lckhUTUwgPSBgPGlucHV0IGNsYXNzPVwiYy1pbnB1dCBjLWlucHV0LS1zbWFsbFwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInRvZG9cIiB2YWx1ZT1cIiR7dG9kby5jb250ZW50fVwiIHJlcXVpcmVkPmA7XG4gICAgdGhpcy50eHQucXVlcnlTZWxlY3RvcignaW5wdXQnKS5mb2N1cygpO1xuICAgIHRoaXMudHh0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcywgZmFsc2UpO1xuICAgIHRoaXMudG9kbyA9IHRvZG87XG4gIH1cblxuICBoYW5kbGVFdmVudChlKSB7XG4gICAgaWYgKGUudHlwZSA9PT0gJ2tleXVwJyAmJiBlLmtleUNvZGUgPT09IDI3KSB7XG4gICAgICB0aGlzLl9jYW5jZWxFZGl0KCk7XG4gICAgfVxuICB9XG5cbiAgX2NhbmNlbEVkaXQoKSB7XG4gICAgdGhpcy50eHQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLCBmYWxzZSk7XG4gICAgdGhpcy50eHQuaW5uZXJIVE1MID0gdGhpcy50b2RvLmNvbnRlbnQ7XG4gIH1cbn1cbiIsImltcG9ydCBnZXREb21Ob2RlIGZyb20gJy4uLy4uLy4uLy4uL3V0aWxzL2dldERvbU5vZGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZWxldGVJY29uIHtcbiAgY29uc3RydWN0b3IoYWN0aW9uKSB7XG4gICAgdGhpcy5hY3Rpb24gPSBhY3Rpb247XG4gICAgdGhpcy53cmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICB0aGlzLmljb24gPSBudWxsO1xuICB9XG5cbiAgcmVuZGVyKHRvZG8pIHtcbiAgICB0aGlzLmljb24gPSBnZXREb21Ob2RlKGBcbiAgICAgIDxpIGNsYXNzPVwiYy1pY29uIGlzLXRyYXNoXCI+PC9pPlxuICAgIGApO1xuICAgIHRoaXMud3JhcC5hcHBlbmRDaGlsZCh0aGlzLmljb24pO1xuXG4gICAgdGhpcy5pY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fb25EZWxldGVUb2RvLmJpbmQodGhpcywgdG9kbyksIGZhbHNlKTtcblxuICAgIHJldHVybiB0aGlzLndyYXA7XG4gIH1cblxuICBfb25EZWxldGVUb2RvKHRvZG8pIHtcbiAgICB0aGlzLmFjdGlvbi5kZWxldGVUb2RvKHRvZG8pO1xuICB9XG59XG4iLCJpbXBvcnQgZ2V0RG9tTm9kZSBmcm9tICcuLi8uLi8uLi8uLi91dGlscy9nZXREb21Ob2RlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWRpdEljb24ge1xuICBjb25zdHJ1Y3RvcihhY3Rpb24pIHtcbiAgICB0aGlzLmFjdGlvbiA9IGFjdGlvbjtcbiAgICB0aGlzLndyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIHRoaXMuaWNvbiA9IG51bGw7XG4gIH1cblxuICByZW5kZXIodG9kbywgb25FZGl0VG9kbywgcGFyZW50KSB7XG4gICAgdGhpcy5pY29uID0gZ2V0RG9tTm9kZShgXG4gICAgICA8aSBjbGFzcz1cImMtaWNvbiBpcy1wZW5jaWxcIj5cbiAgICBgKTtcbiAgICB0aGlzLndyYXAuYXBwZW5kQ2hpbGQodGhpcy5pY29uKTtcblxuICAgIHRoaXMuaWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uRWRpdFRvZG8uYmluZChwYXJlbnQsIHRvZG8pLCBmYWxzZSk7XG5cbiAgICByZXR1cm4gdGhpcy53cmFwO1xuICB9XG59XG4iLCJpbXBvcnQgQ2hlY2tCb3ggZnJvbSAnLi9DaGVja0JveCc7XG5pbXBvcnQgQ29udGVudCBmcm9tICcuL0NvbnRlbnQnO1xuaW1wb3J0IERlbGV0ZUljb24gZnJvbSAnLi9EZWxldGVJY29uJztcbmltcG9ydCBFZGl0SWNvbiBmcm9tICcuL0VkaXRJY29uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9kb0l0ZW0ge1xuICBjb25zdHJ1Y3RvcihhY3Rpb24pIHtcbiAgICB0aGlzLmFjdGlvbiA9IGFjdGlvbjtcbiAgICB0aGlzLml0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuXG4gICAgdGhpcy5jaGVja0JveCA9IG5ldyBDaGVja0JveChhY3Rpb24pO1xuICAgIHRoaXMuY29udGVudCA9IG5ldyBDb250ZW50KGFjdGlvbik7XG4gICAgdGhpcy5kZWxldGVJY29uID0gbmV3IERlbGV0ZUljb24oYWN0aW9uKTtcbiAgICB0aGlzLmVkaXRJY29uID0gbmV3IEVkaXRJY29uKGFjdGlvbik7XG4gIH1cblxuICByZW5kZXIodG9kbykge1xuICAgIHRoaXMuaXRlbS5pZCA9IHRvZG8uaWQ7XG4gICAgdGhpcy5pdGVtLmlubmVySFRNTCA9IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJjLXRvZG9JdGVtXCI+XG4gICAgICAgIDxsYWJlbCBjbGFzcz1cImMtdG9kb0l0ZW1fX2JvZHkgYy1pbnB1dC0tY2hlY2tib3gganMtbGFiZWxcIj48L2xhYmVsPlxuXG4gICAgICAgIDx1bCBjbGFzcz1cImMtdG9kb0l0ZW1fX2luZm8ganMtaW5mb1wiPjwvdWw+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuXG4gICAgY29uc3QgbGFiZWwgPSB0aGlzLml0ZW0ucXVlcnlTZWxlY3RvcignLmpzLWxhYmVsJyk7XG4gICAgY29uc3QgaW5mbyA9IHRoaXMuaXRlbS5xdWVyeVNlbGVjdG9yKCcuanMtaW5mbycpO1xuXG4gICAgbGFiZWwuYXBwZW5kQ2hpbGQodGhpcy5jaGVja0JveC5yZW5kZXIodG9kbykpO1xuICAgIGxhYmVsLmFwcGVuZENoaWxkKHRoaXMuY29udGVudC5yZW5kZXIodG9kbykpO1xuICAgIGluZm8uYXBwZW5kQ2hpbGQodGhpcy5lZGl0SWNvbi5yZW5kZXIodG9kbywgdGhpcy5vbkVkaXRUb2RvLCB0aGlzKSk7XG4gICAgaW5mby5hcHBlbmRDaGlsZCh0aGlzLmRlbGV0ZUljb24ucmVuZGVyKHRvZG8pKTtcblxuICAgIHJldHVybiB0aGlzLml0ZW07XG4gIH1cblxuICBvbkVkaXRUb2RvKHRvZG8pIHtcbiAgICB0aGlzLmNvbnRlbnQucmVuZGVyRWRpdG9yKHRvZG8pO1xuICB9XG59XG4iLCJpbXBvcnQgVG9kb0l0ZW0gZnJvbSAnLi9JdGVtLyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvZG9MaXN0IHtcbiAgY29uc3RydWN0b3IoYWN0aW9uKSB7XG4gICAgdGhpcy5hY3Rpb24gPSBhY3Rpb247XG4gICAgdGhpcy5saXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXRvZG8tbGlzdCcpO1xuICB9XG5cbiAgcmVuZGVyKHN0YXRlKSB7XG4gICAgY29uc3QgeyB0b2RvcywgZmlsdGVyIH0gPSBzdGF0ZTtcblxuICAgIHRoaXMubGlzdC5pbm5lckhUTUwgPSAnJztcbiAgICB0b2Rvcy5maWx0ZXIodG9kbyA9PiB7XG4gICAgICBzd2l0Y2ggKGZpbHRlci5jdXJyZW50KSB7XG4gICAgICAgIGNhc2UgJ2FjdGl2ZSc6XG4gICAgICAgICAgcmV0dXJuICF0b2RvLmlzQ29tcGxldGVkO1xuXG4gICAgICAgIGNhc2UgJ2NvbXBsZXRlZCc6XG4gICAgICAgICAgcmV0dXJuIHRvZG8uaXNDb21wbGV0ZWQ7XG5cbiAgICAgICAgY2FzZSAnYWxsJzpcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm4gdG9kbztcbiAgICAgIH1cbiAgICB9KS5mb3JFYWNoKDo6dGhpcy5fYWRkKTtcbiAgfVxuXG4gIF9hZGQodG9kbykge1xuICAgIGNvbnN0IHRvZG9JdGVtID0gbmV3IFRvZG9JdGVtKHRoaXMuYWN0aW9uKTtcblxuICAgIHRoaXMubGlzdC5hcHBlbmRDaGlsZCh0b2RvSXRlbS5yZW5kZXIodG9kbykpO1xuICB9XG59XG4iXX0=
