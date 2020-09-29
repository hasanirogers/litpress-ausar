import { html, css, LitElement } from 'lit-element';

export class AusarOverlay extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          width: 100%;
          height: 100vh;
          position: fixed;
          top: 0;
          z-index: 1;
          opacity: 0;
          pointer-events: none;
          background-color: var(--color-black);
          transition: opacity 1000ms ease;
        }

        :host([dim]) {
          opacity: 0.5;
        }
      `
    ];
  }

  static get properties() {
    return {
      dim: {
        type: Boolean,
        reflect: true
      }
    }
  };


  constructor() {
    super();

    this.dim = true;

    document.addEventListener('switched-route', (event) => this.handleSwitchRoute(event));
  }

  render() {
    return html`
      <div></div>
    `;
  }

  handleSwitchRoute(event) {
    const page = event.detail === '' || event.detail === '/' ? 'home' : event.detail;

    if(page === 'home') {
      this.dim = false;
    } else {
      this.dim = true;
    }
  }
}
