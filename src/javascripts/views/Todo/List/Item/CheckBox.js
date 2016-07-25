import getDomNode from '../../../../utils/getDomNode';

export default class CheckBox {
  constructor(action) {
    this.action = action;
    this.checkbox = null;
  }

  render(todo) {
    this.checkbox = getDomNode(`
      <input type="checkbox" class="c-input--checkbox__check js-check" ${todo.isCompleted ? 'checked' : ''}>
    `);

    this.checkbox.addEventListener('change', this._onChangeComplete.bind(this, todo), false);

    return this.checkbox;
  }

  _onChangeComplete(todo, e) {
    this.action.editTodo(Object.assign({}, todo, {
      isCompleted: e.target.checked
    }));
  }
}
