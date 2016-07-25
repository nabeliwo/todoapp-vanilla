import getDomNode from '../../../../utils/getDomNode';

export default class Content {
  constructor(action) {
    this.action = action;
    this.content = null;
    this.txt = null;
  }

  render(todo) {
    this.content = getDomNode(`
      <form class="c-input--checkbox__body">
        <span class="c-input--checkbox__body__content">${todo.content}</span>
      </form>
    `);
    this.txt = this.content.childNodes[1];

    this.content.addEventListener('submit', this._onEditTodoContent.bind(this, todo), false);

    return this.content;
  }

  _onEditTodoContent(todo, e) {
    e.preventDefault();

    this.action.editTodo(Object.assign({}, todo, {
      content: e.target.todo.value
    }));
    this.txt.removeEventListener('keyup', this, false);
  }

  renderEditor(todo) {
    this.txt.innerHTML = `<input class="c-input c-input--small" type="text" name="todo" value="${todo.content}" required>`;
    this.txt.querySelector('input').focus();
    this.txt.addEventListener('keyup', this, false);
    this.todo = todo;
  }

  handleEvent(e) {
    if (e.type === 'keyup' && e.keyCode === 27) {
      this._cancelEdit();
    }
  }

  _cancelEdit() {
    this.txt.removeEventListener('keyup', this, false);
    this.txt.innerHTML = this.todo.content;
  }
}
