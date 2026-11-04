import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from './App';
import { NAV_ITEMS } from './content/navigation';
import { profile, projects } from './content/data';

function renderApp() {
  return render(<App />);
}

describe('App', () => {
  it('affiche le nom en titre principal unique', () => {
    renderApp();
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(profile.name);
  });

  it('affiche chaque section annoncée dans la navigation', () => {
    const { container } = renderApp();
    for (const item of NAV_ITEMS) {
      const section = container.querySelector(`section#${item.id}`);
      expect(section, `section #${item.id}`).not.toBeNull();
      expect(within(section as HTMLElement).getByRole('heading', { level: 2 })).toHaveTextContent(item.label);
    }
  });

  it('présente chaque projet avec au moins une démo, un code source ou la mention du dépôt privé', () => {
    renderApp();
    for (const project of projects) {
      const article = screen.getByRole('article', { name: project.name });
      const links = within(article).queryAllByRole('link');
      if (project.code.kind === 'private') {
        expect(article).toHaveTextContent('Dépôt privé');
      }
      expect(links.length > 0 || project.code.kind === 'private').toBe(true);
    }
  });

  it('ouvre les liens externes dans un nouvel onglet, sans window.opener', () => {
    renderApp();
    const external = screen
      .getAllByRole('link')
      .filter((link) => link.getAttribute('href')?.startsWith('http'));
    expect(external.length).toBeGreaterThan(0);
    for (const link of external) {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });

  it('donne un nom distinct à chaque lien de démo et de code', () => {
    renderApp();
    const names = screen
      .getAllByRole('link')
      .map((link) => link.textContent ?? '')
      .filter((name) => name.startsWith('Démo') || name.startsWith('Code source de '));
    expect(new Set(names).size).toBe(names.length);
  });

  it('propose le CV en téléchargement et un contact par e-mail', () => {
    renderApp();
    const cvLinks = screen.getAllByRole('link', { name: /CV/ });
    for (const link of cvLinks) {
      expect(link).toHaveAttribute('href', `${import.meta.env.BASE_URL}${profile.cv.fileName}`);
      expect(link).toHaveAttribute('download');
    }
    expect(screen.getAllByRole('link', { name: /M’écrire|@/ })[0]).toHaveAttribute(
      'href',
      `mailto:${profile.email}`,
    );
  });

  it("n'affiche aucun numéro de téléphone", () => {
    const { container } = renderApp();
    expect(container.querySelector('a[href^="tel:"]')).toBeNull();
    expect(container.textContent).not.toMatch(/0[1-9](?:[\s.\u00a0]?\d{2}){4}/);
  });
});
