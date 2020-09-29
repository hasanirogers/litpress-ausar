import { html, css, LitElement } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { updateMetadata } from 'pwa-helpers/metadata.js';
import { getYear, getMonth, getDate } from '../../../utilities/date.js';
import { stylesShared } from '../../../assets/styles.js';
import { removeLoader } from '../../../utilities/event.js';

import '../../ausar-btn/ausar-btn.js';
import '../../ausar-paginator/ausar-paginator.js';

export class AusarPosts extends LitElement {
  static get styles() {
    return [
      stylesShared,
      css`
        section {
          padding: 2rem;
        }
      `
    ]
  }

  static get properties() {
    return {
      searchData: {
        type: Array
      },
      totalPages: {
        type: Number
      },
      currentPage: {
        type: Number
      }
    }
  }

  constructor() {
    super();

    this.searchData = [];
    this.totalPages = 1;
    this.currentPage = 1;
    this.siteName = localStorage.getItem('site-name') || 'Ausar Theme';
  }

  render() {
    return html`
      <section>
        ${this.renderPosts()}
      </section>
    `
  }

  firstUpdated() {
    this.currentPage = this.location.params.page ? this.location.params.page : this.currentPage;
    this.fetchPosts();
    this.setMetadata();
  }

  async fetchPosts() {
    const searchData = await fetch(`/?rest_route=/wp/v2/posts&per_page=3&page=${this.currentPage}`)
      .then(response => {
        this.totalPages = response.headers.get('x-wp-totalpages');
        return response.text();
      })
      .then(text => {
        try {
          return JSON.parse(text);
        } catch(error) {
          console.error(error);
          return null;
        }
      });

    removeLoader();

    this.searchData = searchData;
  }

  renderPosts() {
    if (this.searchData.length > 0) {
      return html`
        <ul class="posts-list">
          ${this.makePosts(this.searchData)}
        </ul>
        <ausar-paginator
          totalpages=${this.totalPages}
          currentpage=${this.currentPage}>
        </ausar-paginator>
      `;
    }

    return html`<h2>Oh boy. There are no posts.</h2>`;
  }

  makePosts() {
    return this.searchData.map((post) => {
      return html`
        <li>
          <article>
            <h3>${post.title.rendered}</h3>
            <time datetime=${post.date}>${getDate(post.date)}</time>
            ${unsafeHTML(post.excerpt.rendered)}
            <a href="/post/${getYear(post.date)}/${getMonth(post.date)}/${post.slug}">Read More</a>
          </article>
        </li>
      `;
    });
  }

  setMetadata() {
    updateMetadata({
      title: `Posts | ${this.siteName}`,
      description: `${this.siteName} page for displaying all posts.`,
    });
  }
}
