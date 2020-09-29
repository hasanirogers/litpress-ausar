import { html, css, LitElement } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { updateMetadata } from 'pwa-helpers/metadata.js';
import { stylesShared } from '../../../assets/styles.js';
import { removeLoader } from '../../../utilities/event.js';
import { switchRoute } from '../../../utilities/url.js';
import { stripHTML } from '../../../utilities/string.js';

import '../../ausar-btn/ausar-btn.js';

export class AusarPage extends LitElement {
  static get styles() {
    return [
      stylesShared,
      css`

      `
    ]
  }

  static get properties() {
    return {
      pageSlug: {
        type: String
      },

      pageData: {
        type: Array
      }
    }
  }

  constructor() {
    super();

    this.pageSlug = window.location.pathname.replace('/', '');
    this.pageData = [];

    this.siteName = localStorage.getItem('site-name') || 'Ausar Theme';
  }

  render() {
    return html`
      <article>
        ${this.renderPage()}
      </article>
    `
  }

  firstUpdated() {
    this.pageSlug = this.location.params.slug;
    this.fetchPage();
  }

  updated() {
    this.setMetadata();
  }

  async fetchPage() {
    const pageData = await fetch(`/?rest_route=/wp/v2/pages&slug=${this.pageSlug}`)
      .then(response => response.text())
      .then(text => {
        try {
          return JSON.parse(text);
        } catch(error) {
          console.error(error);
          return null;
        }
      });

    this.pageData = pageData;
    removeLoader();
  }

  renderPage() {
    if(this.pageData.length > 0) {
      return html`
        <h1>${this.pageData[0].title.rendered}</h1>
        <div>${unsafeHTML(this.pageData[0].content.rendered)}</div>
      `;
    }

    return html`
      <h2>Sorry. We're unable to find the requested page.</h2>
      <ausar-btn @click=${() => switchRoute('')}>Return Home</ausar-btn>
    `;
  }

  setMetadata() {
    if (this.pageData.length > 0) {
      updateMetadata({
        title: `${this.pageData[0].title.rendered} | ${this.siteName}`,
        description: stripHTML(this.pageData[0].excerpt.rendered)
      });
    }
  }
}
