import { html, css, LitElement } from 'lit-element';
import { svgHamburger, svgSearch } from '../../../assets/svgs.js';
import '../../ausar-nav/ausar-nav.js';

export class AusarHeader extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          position: fixed;
          top: 0;
          left: 50%;
          z-index: 3;
          transform: translateX(-50%);
          width: 100%;
          height: var(--nav-height);
          max-width: var(--nav-width);
          background-color: var(--color-background);
        }

        :host([location="side"]) {
          display: none;
        }

        header {
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: center;
          height: 100%;
          margin: 0 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.5);
        }

        a {
          cursor: pointer;
        }

        ausar-nav {
          display: none;
        }

        @media screen and (min-width: 640px) {
          ausar-nav {
            display: block;
          }
        }

        #hamburger {
          fill: var(--color-white);
        }

        #menu {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        #menu span {
          font-size: 1.5rem;
          display: inline-block;
        }

        @media screen and (min-width: 640px) {
          #menu {
            display: none;
          }
        }

        form {
          margin: 0;
          position: relative;
        }

        form input {
          display: none;
          padding: 0.5rem;
        }

        form.opened input {
          display: block;
          position: fixed;
          top: calc(var(--nav-height) + 1rem);
          left: 50%;
          width: 80vw;
          transform: translateX(-50%);
        }

        @media screen and (min-width: 640px) {
          form {
            width: 320px;
          }

          form > * {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
          }

          form > a {
            right: 1rem;
          }

          form input {
            color: var(--color-white);
            display: block;
            width: 100%;
            border: none;
            padding: 1rem;
            background: rgba(255, 255, 255, 0.1);
          }
        }

      `
    ];
  }

  static get properties() {
    return {
      isSearchOpen: {
        type: Boolean,
      }
    }
  };


  constructor() {
    super();

    this.isSearchOpen = false;
  }

  render() {
    return html`
      <header>
        <ausar-nav></ausar-nav>

        <div id="menu">
          <a id="hamburger" @click=${() => this.toggleHamburger()}>
            ${svgHamburger}
          </a>
          <span>Ausar</span>
        </div>

        <form @submit=${(event) => this.handleSearch(event)} class=${this.isSearchOpen ? 'opened' : ''}>
          <input type="search" placeholder="Search by keywords." />
          <a @click=${() => this.toggleSearch()}>${svgSearch}</a>
        </form>
      </header>

    `;
  }

  toggleHamburger() {
    const drawer = document.querySelector('ausar-app').shadowRoot.querySelector('kemet-drawer');
    drawer.toggle();
  }

  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
  }

  handleSearch(event) {
    event.preventDefault();

    let keywords = this.shadowRoot.querySelector('[type="search"]').value;

    keywords = keywords.replace(/[^a-zA-Z ]/g, '');
    keywords = keywords.replace(' ', '+');

    window.history.pushState(null, null, `/search/${keywords}`);
    window.location.reload();
  }
}
