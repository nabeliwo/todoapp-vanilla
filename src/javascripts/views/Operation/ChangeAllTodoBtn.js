import getDomNode from '../../utils/getDomNode';

export default class ChangeAllTodoBtn {
  constructor(action) {
    this.action = action;
    this.btn = undefined;
  }

  render(state) {
    const { todos } = state;
    const todoLen = todos.length;
    const isAllCompleted = todoLen ? todos.every(todo => todo.isCompleted) : false;

    this.btn = getDomNode(`
      <a data-btn-type="${isAllCompleted ? 'incomplete' : 'complete'}" href="" class="c-btn c-btn--small c-btn--default ${todoLen ? '' : 'is-disabled'}">
        全て${isAllCompleted ? '未' : ''}完了にする
      </a>
    `);

    this.btn.addEventListener('click', ::this._onClickBtn, false);

    return this.btn;
  }

  _onClickBtn(e) {
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

      default:
        break;
    }
  }
}
