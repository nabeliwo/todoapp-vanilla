export default class Type {
  constructor() {
    this.type = document.querySelector('.js-type');
    this.links = ['all', 'active', 'completed'];
  }

  render(hash) {
    this.type.innerHTML = this.links.map(link => `
      <li>
        <a class="c-type__link c-btn c-btn--middle ${hash === link && 'is-active'}" href="#/${link}">${link.toUpperCase()}</a>
      </li>
    `).join('');
  }
}
