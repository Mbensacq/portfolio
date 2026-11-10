import { projects } from './content/data';
import type { Project } from './content/types';

/**
 * Routage statique : chaque route est prérendue dans son propre fichier HTML au build
 * (scripts/prerender.mjs) et les liens internes sont de vrais liens, sans routeur côté client.
 * Les chemins manipulés ici sont relatifs à la base du site (« / », « /projets/atlas/ »).
 */
export type Route = { kind: 'home' } | { kind: 'project'; project: Project } | { kind: 'not-found' };

const PROJECTS_SEGMENT = 'projets';

export const HOME_PATH = '/';

export function projectPath(id: string): string {
  return `/${PROJECTS_SEGMENT}/${id}/`;
}

export function resolveRoute(path: string): Route {
  const segments = path.split('/').filter((segment) => segment.length > 0);
  if (segments.at(-1) === 'index.html') segments.pop();

  if (segments.length === 0) return { kind: 'home' };
  if (segments.length === 2 && segments[0] === PROJECTS_SEGMENT) {
    const project = projects.find((entry) => entry.id === segments[1]);
    if (project) return { kind: 'project', project };
  }
  return { kind: 'not-found' };
}

/** Retire la base de déploiement (« /portfolio/ ») d'un chemin d'URL du navigateur. */
export function stripBase(pathname: string, base: string): string {
  const prefix = base.endsWith('/') ? base.slice(0, -1) : base;
  if (prefix.length === 0) return pathname;
  if (pathname === prefix) return HOME_PATH;
  return pathname.startsWith(`${prefix}/`) ? pathname.slice(prefix.length) : pathname;
}

/** Ajoute la base de déploiement à un chemin interne, pour l'attribut href d'un lien. */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL;
  const prefix = base.endsWith('/') ? base.slice(0, -1) : base;
  return `${prefix}${path}`;
}

/** URL d'un fichier de public/ (CV, captures). */
export function publicUrl(relativePath: string): string {
  return withBase(`/${relativePath}`);
}
