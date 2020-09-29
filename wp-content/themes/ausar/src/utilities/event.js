export const removeLoader = () => {
  const loader = document.querySelector('ausar-app').shadowRoot.querySelector('ausar-loader');
  loader.loading = false;
}

export const removeOverlay = () => {
  const overlay = document.querySelector('ausar-app').shadowRoot.querySelector('ausar-overlay');
  overlay.dim = false;
}
