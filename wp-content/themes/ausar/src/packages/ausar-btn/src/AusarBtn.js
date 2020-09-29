import { html, css, LitElement } from 'lit-element';

export class AusarBtn extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          cursor: pointer;
          display: inline-block;
          border-radius: 1rem;
          padding: 1rem 2rem;
          border: 2px solid var(--color-white);
        }
      `
    ];
  }

  static get properties() {
    return {
      href: {
        type: String,
      },
      target: {
        type: String
      }
    }
  };

  constructor() {
    super();

    this.link = '';
    this.target = '_self'
  }

  render() {
    if (this.link !== '') {
      return html`
        <a href=${this.href} target=${this.target}>
          <slot></slot>
        </a>
      `;
    }

    return html`<slot></slot>`;
  }
}
