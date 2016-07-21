import getDomNode from '../../../../utils/getDomNode';

export default class DeleteIcon {
  constructor(action) {
    this.action = action;
    this.wrap = document.createElement('li');
    this.icon = undefined;
  }

  render(todo) {
    this.icon = getDomNode(`
      <i class="c-icon is-trash"></i>
    `);
    this.wrap.appendChild(this.icon);

    this.icon.addEventListener('click', this._onDeleteTodo.bind(this, todo), false);

    return this.wrap;
  }

  _onDeleteTodo(todo) {
    this.action.deleteTodo(todo);
  }
}
