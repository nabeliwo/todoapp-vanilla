import getDomNode from '../../utils/getDomNode';

export default class DeleteAllTodoBtn {
  constructor(action) {
    this.action = action;
    this.btn = null;
  }

  render(state) {
    const existCompleted = state.todos.some(todo => todo.isCompleted);

    this.btn = getDomNode(`
      <a href="" class="c-btn c-btn--small c-btn--alert ${existCompleted ? '' : 'is-disabled'}">
        完了済みを削除する
      </a>
    `);

    this.btn.addEventListener('click', this._onClickBtn.bind(this, existCompleted), false);

    return this.btn;
  }

  _onClickBtn(existCompleted, e) {
    e.preventDefault();

    if (!existCompleted) {
      return;
    }

    this.action.deleteAllCompletedTodo();
  }
}
