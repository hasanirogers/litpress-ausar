import { html, css, LitElement } from 'lit-element';
import { updateMetadata } from 'pwa-helpers/metadata.js';
import { stylesShared } from '../../../assets/styles.js';
import { removeLoader } from '../../../utilities/event.js';

export class AusarFaqs extends LitElement {
  static get styles() {
    return [
      stylesShared,
      css`

      `
    ]
  }

  constructor() {
    super();

    this.siteName = localStorage.getItem('site-name') || 'Ausar Theme';
  }

  firstUpdated() {
    removeLoader();
    this.setMetadata();
  }

  render() {
    return html`
      <article>
        <h2>This is a static page that will run without a WordPress connection.</h2>
        <p>We did this on purpose. It's the perfect place to explain some things about Ausar. First, Ausar is a SPA that live inside a WordPress theme. All URLs are handled by the SPA. To achieve this you want to make sure that your LAMP stack is configured to handle this.</p>

        <h3>1. You need to enable mod_rewrite for the SPA to work right.</h3>
        <p>The setup for this differs across operating systems and is too long to cover here. A simple google search of something like "enable mod_write [insert your OS here]" should do the trick though.</p>

        <h3>2. You need to configure Apache for the SPA to work right.</h3>
        <p>This can be done in your virtual host with something like:</p>
        <pre><code>&lt;Directory /path/to/wordpress/installation&gt;
  Options Indexes FollowSymLinks MultiViews
  AllowOverride All
  Require all granted
&lt;/Directory&gt;</code></pre>

        <h3>3. Do not allow WordPress to overwrite the include .htacces file.</h3>
        <p>The generated .htacess file redirects users to the WordPress when requests are made. This is in turn loads the SPA, and urls are handled from there.</p>

        <h4>4. Do not turn on permalinks.</h4>
        <p>This will cause WordPress templating engine to interpret /your-page as a request to a WordPress page rather than a route in the SPA.</p>
      </article>
    `
  }

  setMetadata() {
    updateMetadata({
      title: `FAQ | ${this.siteName}`,
      description: `${this.siteName} page for displaying answers to common questions.`,
    });
  }
}
