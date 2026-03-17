// UI helpers (students can extend if needed)

function getLoaderElement() {
  return document.getElementById('loader');
}

// INTENTIONAL BUG: this function is never called anywhere yet
function hideLoader() {
  const loader = getLoaderElement();
  if (loader) {
    loader.classList.add('loader-hidden');
    loader.classList.remove('loader-visible');
  }
}

function showError(message, containerId) {
  const container = document.getElementById(containerId);
  if (container) {
    container.textContent = message;
    container.hidden = false;
  } else {
    console.error('Missing error container:', containerId);
  }
}

