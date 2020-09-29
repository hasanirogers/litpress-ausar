import { LitElement, html, css } from 'lit-element';
import { Router } from '@vaadin/router';
import '@kemet/kemet-drawer/kemet-drawer.js';

import '../../ausar-home/ausar-home.js';
import '../../ausar-page/ausar-page.js';
import '../../ausar-post/ausar-post.js';
import '../../ausar-posts/ausar-posts.js';
import '../../ausar-search/ausar-search.js';
import '../../ausar-faqs/ausar-faqs.js';

import '../../ausar-header/ausar-header.js';
import '../../ausar-loader/ausar-loader.js';
import '../../ausar-overlay/ausar-overlay.js';
import '../../ausar-nav/ausar-nav.js';

export class AusarApp extends LitElement {

  static get styles() {
    return [
      css`
        kemet-drawer {
          position: absolute;
          z-index: 2;
          margin-top: var(--nav-height);
          min-height: calc(100vh - var(--nav-height));
        }

        [slot="content"] {
          margin: auto;
          max-width: var(--content-width);
        }
      `,
    ];
  }

  static get properties() {
    return {
      title: { type: String },
      page: { type: String, reflect: true, },
      menuOpened: { type: Boolean },
      smallScreen: { type: Boolean },
    };
  }

  constructor() {
    super();

    // defaults
    this.page = window.location.pathname === '/' ? 'home' : window.location.pathname.replace('/', '');
    this.menuOpened = false;

    // listeners
    document.addEventListener('switched-route', (event) => this.handleSwitchRoute(event));
  }

  render() {
    return html`
      <ausar-header></ausar-header>

      <kemet-drawer effect="scale" side="left">
        <nav slot="navigation">
          <ausar-nav location="side"></ausar-nav>
        </nav>
        <section slot="content"></section>
      </kemet-drawer>

      <ausar-overlay></ausar-overlay>
      <ausar-loader></ausar-loader>
    `;
  }

  firstUpdated() {
    const router = new Router(this.shadowRoot.querySelector('[slot="content"]'));

    router.setRoutes([
      {
        path: '/',
        component: 'ausar-home',
        action: () => { this.resetLoader() }
      },
      {
        path: '/posts',
        component: 'ausar-posts',
        action: () => { this.resetLoader() }
      },
      {
        path: '/faqs',
        component: 'ausar-faqs',
        action: () => { this.resetLoader() }
      },
      {
        path: '/posts/page/:page',
        component: 'ausar-posts',
        action: () => { this.resetLoader() }
      },
      {
        path: '/post/:year/:month/:slug',
        component: 'ausar-post',
        action: () => { this.resetLoader() }
      },
      {
        path: '/search/:keywords',
        component: 'ausar-search',
        action: () => { this.resetLoader() }
      },
      {
        path: '/:slug',
        component: 'ausar-page',
        action: () => { this.resetLoader() }
      },
      {
        path: '(.*)',
        redirect: '/',
        action: () => { this.page = 'home'; }
      }
    ]);

    this.getSiteMetadata();
  }

  handleSwitchRoute(event) {
    let page = event.detail;

    if (page === '' || page === '/') {
      page = 'home';
    }

    this.page = page;
  }

  resetLoader() {
    const loader = this.shadowRoot.querySelector('ausar-loader');
    loader.loading = true;
  }

  async getSiteMetadata() {
    const response = await fetch(`/?rest_route=/`);
    const siteData = await response.json();

    localStorage.setItem('site-name', siteData.name);
  }
}
