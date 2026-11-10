import { describe, expect, it } from 'vitest';
import { projects } from './content/data';
import { projectPath, resolveRoute, stripBase, withBase } from './routing';

describe('resolveRoute', () => {
  it.each(['/', '', '/index.html'])('reconnaît l’accueil : « %s »', (path) => {
    expect(resolveRoute(path)).toEqual({ kind: 'home' });
  });

  it('reconnaît la page de chaque projet, avec ou sans barre finale', () => {
    for (const project of projects) {
      const path = projectPath(project.id);
      expect(resolveRoute(path)).toEqual({ kind: 'project', project });
      expect(resolveRoute(path.slice(0, -1))).toEqual({ kind: 'project', project });
      expect(resolveRoute(`${path}index.html`)).toEqual({ kind: 'project', project });
    }
  });

  it.each(['/projets/', '/projets/inconnu/', '/projets/atlas/extra/', '/autre/', '/captures/atlas.jpg'])(
    'renvoie « introuvable » pour « %s »',
    (path) => {
      expect(resolveRoute(path)).toEqual({ kind: 'not-found' });
    },
  );
});

describe('stripBase', () => {
  it.each([
    ['/portfolio/', '/portfolio/', '/'],
    ['/portfolio', '/portfolio/', '/'],
    ['/portfolio/projets/atlas/', '/portfolio/', '/projets/atlas/'],
    ['/projets/atlas/', '/', '/projets/atlas/'],
    ['/', '/', '/'],
    // Un chemin hors de la base n'est pas modifié : il sera traité comme introuvable.
    ['/portfolio-bis/', '/portfolio/', '/portfolio-bis/'],
  ])('%s avec la base %s donne %s', (pathname, base, expected) => {
    expect(stripBase(pathname, base)).toBe(expected);
  });
});

describe('withBase', () => {
  it('préfixe un chemin interne par la base de déploiement, sans double barre', () => {
    const base = import.meta.env.BASE_URL;
    expect(withBase('/')).toBe(base);
    expect(withBase('/projets/atlas/')).toBe(`${base}projets/atlas/`);
    expect(withBase('/projets/atlas/')).not.toContain('//');
  });
});
