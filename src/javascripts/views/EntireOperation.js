export default class EntireOperation {
  constructor() {
    this.wrap = document.querySelector('.js-entireOperation');
    this.btn = undefined;
  }

  init(state) {
    this.render(state);

    this.btn.forEach(btn => {
      btn.addEventListener('click', ::this.onClickBtn, false);
    });
  }

  render(state) {
    const todos = state.todos;
    const todoLen = todos.length;
    const isAllCompleted = todoLen ? todos.every(todo => todo.isCompleted) : false;
    const existCompleted = todos.some(todo => todo.isCompleted);

    this.wrap.innerHTML = `
      <li>
        <a href="" class="c-btn c-btn--small c-btn--default ${todoLen ? '' : 'is-disabled'}">全て${isAllCompleted ? '未' : ''}完了にする</a>
      </li>
      <li>
        <a href="" class="c-btn c-btn--small c-btn--alert ${existCompleted ? '' : 'is-disabled'}">完了済みを削除する</a>
      </li>
    `;

    this.btn = this.wrap.querySelectorAll('a');
  }

  onClickBtn(e) {
    e.preventDefault();

    const target = e.target;

    if (target.classList.contains('is-disabled')) {
      return;
    }

    console.log(e.target);
  }
}
