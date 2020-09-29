import { html, css, LitElement } from 'lit-element';
import { stylesShared } from '../../../assets/styles.js';

export class AusarPaginator extends LitElement {
  static get styles() {
    return [
      stylesShared,
      css`
        :host {
          font-size: 1.25rem;
        }

        ul {
          display: flex;
          gap: 1rem;
          list-style: none;
          align-items: center;
        }

        span {
          font-size: 2rem;
          position: relative;
          top: 2px;
        }

        .page-of {
          position: relative;
          top: 4px;
        }
      `
    ];
  }

  static get properties() {
    return {
      totalPages: {
        type: Number
      },
      currentPage: {
        type: Number
      }
    }
  };


  constructor() {
    super();

    this.totalPages = 1;
    this.currentPage = 1;
  }

  render() {
    return html`
      <ul>
        ${this.makePrevLink()}
        <li class="page-of">
          page: ${this.currentPage} of ${this.totalPages}
        </li>
        ${this.makeNextLink()}
      </ul>
    `;
  }

  makePrevLink() {
    if (this.currentPage > 1) {
      const href = `/posts/page/${this.currentPage - 1}`;

      return html`
        <li>
          <a href=${href}>
            <span>&lsaquo;</span> Previous
          </a>
        </li>

      `;
    }

    return null;
  }

  makeNextLink() {
    if (this.currentPage < this.totalPages) {
      const href = `/posts/page/${this.currentPage + 1}`

      return html`
        <li>
          <a href=${href}>
            Next <span>&rsaquo;</span>
          </a>
        </li>
      `
    }

    return null;
  }
}
