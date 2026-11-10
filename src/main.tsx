import '@fontsource-variable/schibsted-grotesk/wght.css';
import './styles/global.css';

import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App';
import { stripBase } from './routing';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Élément #root introuvable dans index.html');
}

const app = (
  <StrictMode>
    <App path={stripBase(window.location.pathname, import.meta.env.BASE_URL)} />
  </StrictMode>
);

// En production, chaque page est prérendue au build (scripts/prerender.mjs) : on l'hydrate.
// En développement, #root ne contient qu'un commentaire : rendu côté client.
if (container.firstElementChild) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
