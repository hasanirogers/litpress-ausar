import { html, css, LitElement } from 'lit-element';
import { updateMetadata } from 'pwa-helpers/metadata.js';
import { removeLoader, removeOverlay } from '../../../utilities/event.js';

export class AusarHome extends LitElement {
  static get styles() {
    return [
      css `
        div {
          text-align: center;
          padding-top: 2rem;
          text-shadow: 2px 2px 2px var(--color-black);
        }

        .intro {
          font-size: 1rem;
        }

        .title {
          display: block;
          font-size: 5rem;
          line-height: 1;
        }

        @media screen and (min-width: 640px) {
          .title {
            line-height: 1.5;
          }
        }

        .description {
          font-size: 1.5rem;
        }
      `
    ];
  }

  constructor() {
    super();

    this.siteName = localStorage.getItem('site-name') || 'Ausar Theme';
  }

  firstUpdated() {
    removeLoader();
    removeOverlay();
    this.setMetadata();
  }

  render() {
    return html`
      <div>
        <span class="intro">Welcome to</span>
        <span class="title">The Ausar Theme</span>
        <span class="description">It's the world's first LitElement + WordPress theme.</span>
      </div>
    `;
  }

  setMetadata() {
    updateMetadata({
      title: this.siteName,
      description: `It's the world's first LitElement + WordPress theme.`,
    });
  }
}
