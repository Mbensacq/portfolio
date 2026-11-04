import '@fontsource-variable/schibsted-grotesk/wght.css';
import './styles/global.css';

import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Élément #root introuvable dans index.html');
}

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// En production, le HTML est prérendu au build (scripts/prerender.mjs) : on l'hydrate.
// En développement, #root ne contient qu'un commentaire : rendu côté client.
if (container.firstElementChild) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
