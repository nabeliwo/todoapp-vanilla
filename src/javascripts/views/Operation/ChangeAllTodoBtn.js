import getDomNode from '../../utils/getDomNode';

export default class ChangeAllTodoBtn {
  constructor(action) {
    this.action = action;
    this.btn = null;
  }

  render(state) {
    const { todos } = state;
    const todoLen = todos.length;
    const isAllCompleted = todoLen ? todos.every(todo => todo.isCompleted) : false;

    this.btn = getDomNode(`
      <a href="" class="c-btn c-btn--small c-btn--default ${todoLen ? '' : 'is-disabled'}">
        全て${isAllCompleted ? '未' : ''}完了にする
      </a>
    `);

    this.btn.addEventListener('click', this._onClickBtn.bind(this, [todoLen, isAllCompleted]), false);

    return this.btn;
  }

  _onClickBtn(state, e) {
    e.preventDefault();

    const [todoLen, isAllCompleted] = state;

    if (!todoLen) {
      return;
    }

    this.action.changeAllTodo(!isAllCompleted);
  }
}
