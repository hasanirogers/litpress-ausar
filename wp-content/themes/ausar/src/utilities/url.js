import { Router } from '@vaadin/router';

/**
 * A helper that handles switching pages
 * @param {string} route
 */

export const switchRoute = (route) => {
  document.dispatchEvent(new CustomEvent('switched-route', {
    bubbles: true,
    composed: true,
    detail: route
  }));

  Router.go(`/${route}`);
}

export const getPostSlugByUrl = (url) => {
  const urlArray = url.split('/');
  const slug = urlArray[urlArray.length - 1];

  return slug;
}
