import { html, css, LitElement } from 'lit-element';
import { switchRoute } from '../../../utilities/url.js';


export class AusarNav extends LitElement {
  static get styles() {
    return [
      css`
        :host([location="side"]) {
          padding: 2rem;
          display: block;
        }

        a {
          cursor: pointer;
        }

        span {
          font-size: 2rem;
        }

        nav {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        :host([location="side"]) nav {
          gap: 1.5rem;
          flex-direction: column;
          align-items: flex-start;
        }

        nav a:not(:first-child) {
          position: relative;
          top: 4px;
        }
      `
    ];
  }

  static get properties() {
    return {
      location: {
        type: String,
        reflect: true
      }
    }
  };


  constructor() {
    super();

    this.location = 'top';
  }

  render() {
    return html`
      <nav>
        <a @click=${() => this.link('')}>
          <span>Ausar</span>
        </a>
        <a @click=${() => this.link('posts')}>Posts</a>
        <a @click=${() => this.link('sample-page')}>Sample&nbsp;Page</a>
        <a @click=${() => this.link('faqs')}>FAQs</a>
      </nav>
    `;
  }

  link(route) {
    const drawer = document.querySelector('ausar-app').shadowRoot.querySelector('kemet-drawer');
    drawer.close();

    switchRoute(route);
  }
}
