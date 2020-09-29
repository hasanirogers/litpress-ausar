import { html, css, LitElement } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { updateMetadata } from 'pwa-helpers/metadata.js';
import { stylesShared } from '../../../assets/styles.js';
import { removeLoader } from '../../../utilities/event.js';
import { getPostSlugByUrl, switchRoute } from '../../../utilities/url.js';
import { stripHTML } from '../../../utilities/string.js';


export class AusarPost extends LitElement {
  static get styles() {
    return [
      stylesShared,
      css`

      `
    ]
  }

  static get properties() {
    return {
      postSlug: {
        type: String
      },

      postData: {
        type: Array
      }
    }
  }

  constructor() {
    super();

    this.postSlug = getPostSlugByUrl(window.location.href);
    this.postData = [];
    this.siteName = localStorage.getItem('site-name') || 'Ausar Theme';
  }

  render() {
    return html`
      <article>
        ${this.renderPost()}
      </article>
    `
  }

  firstUpdated() {
    this.postSlug = this.location.params.slug;
    this.fetchPost();
  }

  updated() {
    this.setMetadata();
  }

  async fetchPost() {
    const postData = await fetch(`/?rest_route=/wp/v2/posts&slug=${this.postSlug}`)
      .then(response => response.text())
      .then(text => {
        try {
          return JSON.parse(text);
        } catch(error) {
          console.error(error);
          return null;
        }
      });

    this.postData = postData;
    removeLoader();
  }

  renderPost() {
    if(this.postData.length > 0) {
      return html`
        <h1>${this.postData[0].title.rendered}</h1>
        <div>${unsafeHTML(this.postData[0].content.rendered)}</div>
      `;
    }

    return html`
      <h2>Sorry. We're unable to find the requested post.</h2>
      <ausar-btn @click=${() => switchRoute('')}>Return Home</ausar-btn>
    `;
  }

  setMetadata() {
    if (this.postData.length > 0) {
      updateMetadata({
        title: `${this.postData[0].title.rendered} | ${this.siteName}`,
        description: stripHTML(this.postData[0].excerpt.rendered)
      });
    }
  }
}
