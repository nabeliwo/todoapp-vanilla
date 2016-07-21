export default class Filter {
  constructor() {
    this.filter = document.querySelector('.js-filter');
  }

  render(state) {
    const { filter } = state;

    this.filter.innerHTML = filter.list.map(item => `
      <li>
        <a class="c-filter__link c-btn c-btn--middle ${filter.current === item && 'is-active'}" href="#/${item}">${item.toUpperCase()}</a>
      </li>
    `).join('');
  }
}
