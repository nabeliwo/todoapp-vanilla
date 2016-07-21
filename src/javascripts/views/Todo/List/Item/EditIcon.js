import getDomNode from '../../../../utils/getDomNode';

export default class EditIcon {
  constructor(action) {
    this.action = action;
    this.wrap = document.createElement('li');
    this.icon = undefined;
  }

  render(todo, onEditTodo, parent) {
    this.icon = getDomNode(`
      <i class="c-icon is-pencil js-edit">
    `);
    this.wrap.appendChild(this.icon);

    this.icon.addEventListener('click', onEditTodo.bind(parent, todo), false);

    return this.wrap;
  }
}
