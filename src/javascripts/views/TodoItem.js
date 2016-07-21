export default class TodoItem {
  constructor(action) {
    this.action = action;
    this.el = document.createElement('li');
    this.checkbox = undefined;
    this.txt = undefined;
    this.edit = undefined;
    this.delete = undefined;
  }

  render(todo) {
    this.el.id = todo.id;
    this.el.innerHTML = `
      <div class="c-todoItem">
        <label class="c-todoItem__body c-input--checkbox">
          <input type="checkbox" class="c-input--checkbox__check js-check" ${todo.isCompleted ? 'checked' : ''}>
          <form class="c-input--checkbox__body js-form">
            <span class="c-input--checkbox__body__txt js-txt">${todo.content}</span>
          </form>
        </label>

        <ul class="c-todoItem__info">
          <li><i class="c-icon is-pencil js-edit"></i></li>
          <li><i class="c-icon is-trash js-delete"></i></li>
        </ul>
      </div>
    `;

    this.todo = todo;
    this.checkbox = this.el.querySelector('.js-check');
    this.form = this.el.querySelector('.js-form');
    this.txt = this.el.querySelector('.js-txt');
    this.edit = this.el.querySelector('.js-edit');
    this.delete = this.el.querySelector('.js-delete');
    this._event();

    return this.el;
  }

  _event() {
    this.form.addEventListener('submit', ::this._sendTodo, false);
    this.checkbox.addEventListener('change', ::this._onChangeComplete, false);
    this.edit.addEventListener('click', ::this._onEditTodo, false);
    this.delete.addEventListener('click', ::this._onDeleteTodo, false);
  }

  _onChangeComplete(e) {
    this.action.editTodo(Object.assign({}, this.todo, {
      isCompleted: e.target.checked
    }));
  }

  _onEditTodo() {
    this.txt.innerHTML = `<input class="c-input c-input--small" type="text" name="todo" value="${this.todo.content}" required>`;
    this.txt.querySelector('input').focus();
    this.txt.addEventListener('keyup', this, false);
  }

  handleEvent(e) {
    if (e.keyCode === 27) {
      this._cancelEdit();
    }
  }

  _cancelEdit() {
    this.txt.removeEventListener('keyup', this, false);
    this.txt.innerHTML = this.todo.content;
  }

  _sendTodo(e) {
    e.preventDefault();

    this.action.editTodo(Object.assign({}, this.todo, {
      content: e.target.todo.value
    }));
    this.txt.removeEventListener('keyup', this, false);
  }

  _onDeleteTodo() {
    this.action.deleteTodo(this.todo);
  }
}
