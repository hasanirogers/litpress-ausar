import { html, css, LitElement } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { updateMetadata } from 'pwa-helpers/metadata.js';
import { getYear, getMonth, getDate } from '../../../utilities/date.js';
import { stylesShared } from '../../../assets/styles.js';
import { removeLoader } from '../../../utilities/event.js';

import '../../ausar-btn/ausar-btn.js';

export class AusarSearch extends LitElement {
  static get styles() {
    return [
      stylesShared,
      css`
        section {
          padding: 2rem;
        }

        ausar-btn {
          margin-top: 2rem;
        }
      `
    ]
  }

  static get properties() {
    return {
      keywords: {
        type: String
      },
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

    this.keywords = '';
    this.searchData = [];
    this.totalPages = 0;
    this.currentPage = 1;
    this.siteName = localStorage.getItem('site-name') || 'Ausar Theme';
  }

  render() {
    return html`
      <section>
        ${this.renderSearch()}
      </section>
    `
  }

  firstUpdated() {
    this.keywords = this.location.params.keywords;
    this.fetchPosts();

    window.addEventListener('scroll', () => this.handleScroll());
  }

  updated() {
    this.setMetadata();
  }

  async fetchPosts() {
    const searchData = await fetch(`/?rest_route=/wp/v2/search&per_page=3&page=${this.currentPage}&search=${this.keywords}`)
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

    searchData.forEach((post) => {
      this.fetchSinglePost(post.id).then(payload => {
        this.searchData = this.searchData.concat(payload);
      });
    });
  }

  fetchSinglePost(postID) {
    return fetch(`/?rest_route=/wp/v2/posts/${postID}`)
      .then(response => response.text())
      .then(text => {
        try {
          return JSON.parse(text);
        } catch(error) {
          console.error(error);
          return null;
        };
      });
  }

  loadMorePosts() {
    if (this.currentPage < this.totalPages) {
      this.currentPage += 1;

      this.fetchPosts();
    }
  }

  renderSearch() {
    if (this.searchData.length > 0) {
      return html`
        <h2>Showing results for <em>${this.filterKeywords(this.keywords)}</em>.</h2>
        <ul class="posts-list">
          ${this.makePosts(this.searchData)}
        </ul>
        ${this.renderLoadMoreBtn()}
      `;
    }

    return html`<h2>Sorry. Nothing found for <em>${this.filterKeywords(this.keywords)}</em>.</h2>`;
  }

  renderLoadMoreBtn() {
    if (this.currentPage < this.totalPages && this.totalPages !== 0) {
      return html`
        <ausar-btn @click=${() => this.loadMorePosts()}>
          Load More Posts
        </ausar-btn>
      `;
    }

    return null;
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

  filterKeywords(keywords) {
    return keywords.replace('+', ' ');
  }

  handleScroll() {
    const list = this.shadowRoot.querySelector('ul');

    if (list) {
      const listOffset = list.offsetTop + list.clientHeight;
      const pageOffset = window.pageYOffset + window.innerHeight;

      if (pageOffset > listOffset) {
        this.loadMorePosts();
      }
    }
  }

  setMetadata() {
    if (this.keywords) {
      updateMetadata({
        title: `${this.filterKeywords(this.keywords)} | Search | ${this.siteName}`,
        description: `A search for ${this.filterKeywords(this.keywords)}.`
      });
    }
  }
}
