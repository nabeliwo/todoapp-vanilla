export default class TodoItem {
  constructor() {
    this.el = document.createElement('li');
    this.checkbox = undefined;
    this.edit = undefined;
    this.delete = undefined;
  }

  render(todo) {
    this.el.innerHTML = `
      <div id="${todo.id}" class="c-todoItem">
        <label class="c-todoItem__body c-input--checkbox">
          <input type="checkbox" class="c-input--checkbox__check" ${todo.isCompleted ? 'checked' : ''}>
          <span class="c-input--checkbox__txt">${todo.content}</span>
        </label>

        <ul class="c-todoItem__info">
          <li><i class="c-icon is-pencil"></i></li>
          <li><i class="c-icon is-trash"></i></li>
        </ul>
      </div>
    `;

    this.event();

    return this.el;
  }

  event() {

  }
}
