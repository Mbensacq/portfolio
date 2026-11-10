import { describe, expect, it } from 'vitest';
import { profile, projects } from './content/data';
import { render, renderPages } from './entry-server';

describe('prérendu', () => {
  it('produit un HTML complet pour l’accueil sans exécuter de code côté client', () => {
    const html = render('/');
    expect(html).toContain(`<h1 class="band__name">${profile.name}</h1>`);
    expect(html).toContain('id="projets"');
    expect(html).toContain(`mailto:${profile.email}`);
  });

  it('prévoit un fichier par page : accueil, chaque projet, page d’erreur', () => {
    const pages = renderPages();
    expect(pages.map((page) => page.file)).toEqual([
      'index.html',
      ...projects.map((project) => `projets/${project.id}/index.html`),
      '404.html',
    ]);
    expect(new Set(pages.map((page) => page.file)).size).toBe(pages.length);
    for (const page of pages) {
      expect(page.html.length, page.file).toBeGreaterThan(0);
    }
  });

  it('donne à chaque page projet un titre, une description et une URL canonique propres', () => {
    const pages = renderPages();
    for (const project of projects) {
      const page = pages.find((entry) => entry.file === `projets/${project.id}/index.html`);
      expect(page?.html).toContain(project.name);
      expect(page?.meta?.title).toContain(project.name);
      expect(page?.meta?.description).toBe(project.description);
      expect(page?.meta?.url).toBe(`${profile.siteUrl}projets/${project.id}/`);
    }
  });

  it('ne donne ni métadonnées propres à l’accueil ni URL canonique à la page d’erreur', () => {
    const pages = renderPages();
    expect(pages.find((page) => page.file === 'index.html')?.meta).toBeUndefined();
    const notFound = pages.find((page) => page.file === '404.html');
    expect(notFound?.html).toContain('Page introuvable');
    expect(notFound?.meta?.url).toBeUndefined();
  });
});
