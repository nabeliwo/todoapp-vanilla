import CheckBox from './CheckBox';
import Content from './Content';
import DeleteIcon from './DeleteIcon';
import EditIcon from './EditIcon';

export default class TodoItem {
  constructor(action) {
    this.action = action;
    this.item = document.createElement('li');

    this.checkBox = new CheckBox(action);
    this.content = new Content(action);
    this.deleteIcon = new DeleteIcon(action);
    this.editIcon = new EditIcon(action);
  }

  render(todo) {
    this.item.id = todo.id;
    this.item.innerHTML = `
      <div class="c-todoItem">
        <label class="c-todoItem__body c-input--checkbox js-label"></label>

        <ul class="c-todoItem__info js-info"></ul>
      </div>
    `;

    const label = this.item.querySelector('.js-label');
    const info = this.item.querySelector('.js-info');

    label.appendChild(this.checkBox.render(todo));
    label.appendChild(this.content.render(todo));
    info.appendChild(this.editIcon.render(todo, this.onEditTodo, this));
    info.appendChild(this.deleteIcon.render(todo));

    return this.item;
  }

  onEditTodo(todo) {
    this.content.renderEditor(todo);
  }
}
