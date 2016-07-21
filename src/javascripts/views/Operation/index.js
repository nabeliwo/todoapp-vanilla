import ChangeAllTodoBtn from './ChangeAllTodoBtn';
import DeleteAllTodoBtn from './DeleteAllTodoBtn';

export default class Operation {
  constructor(action) {
    this.action = action;
    this.wrap = document.querySelector('.js-operation');
    this.btnList = [
      new ChangeAllTodoBtn(this.action),
      new DeleteAllTodoBtn(this.action)
    ];
  }

  render(state) {
    this.wrap.innerHTML = '';
    this.btnList.forEach(btn => {
      const li = document.createElement('li');

      li.appendChild(btn.render(state));
      this.wrap.appendChild(li);
    });
  }
}
