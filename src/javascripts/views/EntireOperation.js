export default class EntireOperation {
  constructor(action) {
    this.action = action;
    this.wrap = document.querySelector('.js-entireOperation');
    this.btn = undefined;
  }

  render(state) {
    const todos = state.todos;
    const todoLen = todos.length;
    const isAllCompleted = todoLen ? todos.every(todo => todo.isCompleted) : false;
    const existCompleted = todos.some(todo => todo.isCompleted);

    this.wrap.innerHTML = `
      <li>
        <a data-btn-type="${isAllCompleted ? 'incomplete' : 'complete'}" href="" class="c-btn c-btn--small c-btn--default ${todoLen ? '' : 'is-disabled'}">全て${isAllCompleted ? '未' : ''}完了にする</a>
      </li>
      <li>
        <a data-btn-type="delete" href="" class="c-btn c-btn--small c-btn--alert ${existCompleted ? '' : 'is-disabled'}">完了済みを削除する</a>
      </li>
    `;

    this.btn = this.wrap.querySelectorAll('a');
    this.btn.forEach(btn => {
      btn.addEventListener('click', ::this.onClickBtn, false);
    });
  }

  onClickBtn(e) {
    e.preventDefault();

    const target = e.target;

    if (target.classList.contains('is-disabled')) {
      return;
    }

    switch (target.dataset.btnType) {
      case 'incomplete':
        this.action.changeAllTodo(false);
        break;

      case 'complete':
        this.action.changeAllTodo(true);
        break;

      case 'delete':
        this.action.deleteAllCompletedTodo();
        break;

      default:
        break;
    }
  }
}
