import { html, css, LitElement } from 'lit-element';

export class AusarLoader extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          width: 100vw;
          height: 100vh;
          display: flex;
          position: fixed;
          z-index: 3;
          pointer-events: none;
          background: rgba(128, 128, 128, 0);
          transition: all 3000ms ease;
        }

        :host([loading]) {
          background: rgba(128, 128, 128, 0.75);
        }

        section {
          margin: auto;
          display: inline-block;
          transform: scale(2);
        }

        :host([loading]) .sk-chase {
          opacity: 1;
        }

        .sk-chase {
          width: 40px;
          height: 40px;
          opacity: 0;
          position: relative;
          transition: opacity 2000ms ease;
          animation: sk-chase 2.5s infinite linear both;
        }

        .sk-chase-dot {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          animation: sk-chase-dot 2.0s infinite ease-in-out both;
        }

        .sk-chase-dot:before {
          content: '';
          display: block;
          width: 25%;
          height: 25%;
          background-color: #fff;
          border-radius: 100%;
          animation: sk-chase-dot-before 2.0s infinite ease-in-out both;
        }

        .sk-chase-dot:nth-child(1) { animation-delay: -1.1s; }
        .sk-chase-dot:nth-child(2) { animation-delay: -1.0s; }
        .sk-chase-dot:nth-child(3) { animation-delay: -0.9s; }
        .sk-chase-dot:nth-child(4) { animation-delay: -0.8s; }
        .sk-chase-dot:nth-child(5) { animation-delay: -0.7s; }
        .sk-chase-dot:nth-child(6) { animation-delay: -0.6s; }
        .sk-chase-dot:nth-child(1):before { animation-delay: -1.1s; }
        .sk-chase-dot:nth-child(2):before { animation-delay: -1.0s; }
        .sk-chase-dot:nth-child(3):before { animation-delay: -0.9s; }
        .sk-chase-dot:nth-child(4):before { animation-delay: -0.8s; }
        .sk-chase-dot:nth-child(5):before { animation-delay: -0.7s; }
        .sk-chase-dot:nth-child(6):before { animation-delay: -0.6s; }

        @keyframes sk-chase {
          100% { transform: rotate(360deg); }
        }

        @keyframes sk-chase-dot {
          80%, 100% { transform: rotate(360deg); }
        }

        @keyframes sk-chase-dot-before {
          50% {
            transform: scale(0.4);
          } 100%, 0% {
            transform: scale(1.0);
          }
        }
      `
    ];
  }

  static get properties() {
    return {
      loading: {
        type: Boolean,
        reflect: true
      }
    }
  };


  constructor() {
    super();

    this.loading = true;
  }

  render() {
    return html`
      <section>
        <div class="sk-chase">
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
        </div>
      </section>
    `;
  }
}
