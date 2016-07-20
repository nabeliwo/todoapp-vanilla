import Type from './views/Type';

class TodoApp {
  constructor() {
    this.typeView = new Type();
    this.event();
  }

  start() {
    this.onHashChange();
  }

  event() {
    window.addEventListener('hashchange', ::this.onHashChange);
  }

  onHashChange() {
    const hash = location.hash.split('#/')[1] || 'all';
    this.typeView.render(hash);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const todoApp = new TodoApp();

  todoApp.start();
});
