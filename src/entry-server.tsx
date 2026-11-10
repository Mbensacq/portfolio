import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './App';
import { profile, projects } from './content/data';
import { HOME_PATH, projectPath } from './routing';

/** Page à écrire au build : fichier de sortie, HTML de l'application et métadonnées propres. */
export interface PrerenderedPage {
  /** Fichier de sortie, relatif à dist/. */
  file: string;
  html: string;
  /** Absent pour l'accueil, qui garde les métadonnées de index.html. */
  meta?: {
    title: string;
    description: string;
    /** URL canonique ; absente pour la page d'erreur, qui n'est pas indexée. */
    url?: string;
  };
}

/** Chemin volontairement inexistant, pour produire la page d'erreur servie par GitHub Pages. */
const NOT_FOUND_PATH = '/page-introuvable/';

export function render(path: string): string {
  return renderToString(
    <StrictMode>
      <App path={path} />
    </StrictMode>,
  );
}

/** Toutes les pages du site, prérendues par scripts/prerender.mjs. */
export function renderPages(): PrerenderedPage[] {
  const siteUrl = profile.siteUrl.endsWith('/') ? profile.siteUrl.slice(0, -1) : profile.siteUrl;

  return [
    { file: 'index.html', html: render(HOME_PATH) },
    ...projects.map((project): PrerenderedPage => {
      const path = projectPath(project.id);
      return {
        file: `${path.slice(1)}index.html`,
        html: render(path),
        meta: {
          title: `${project.name}, ${project.tagline} | ${profile.name}`,
          description: project.description,
          url: `${siteUrl}${path}`,
        },
      };
    }),
    {
      file: '404.html',
      html: render(NOT_FOUND_PATH),
      meta: {
        title: `Page introuvable | ${profile.name}`,
        description: 'Cette adresse ne correspond à aucune page du site.',
      },
    },
  ];
}
