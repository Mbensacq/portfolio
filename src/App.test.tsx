import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from './App';
import { NAV_ITEMS } from './content/navigation';
import { profile, projects } from './content/data';
import { projectPath, withBase } from './routing';

function renderHome() {
  return render(<App path="/" />);
}

function externalLinks(): HTMLElement[] {
  return screen.getAllByRole('link').filter((link) => link.getAttribute('href')?.startsWith('http'));
}

describe('accueil', () => {
  it('affiche le nom en titre principal unique', () => {
    renderHome();
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(profile.name);
  });

  it('affiche chaque section annoncée dans la navigation', () => {
    const { container } = renderHome();
    for (const item of NAV_ITEMS) {
      const section = container.querySelector(`section#${item.id}`);
      expect(section, `section #${item.id}`).not.toBeNull();
      expect(within(section as HTMLElement).getByRole('heading', { level: 2 })).toHaveTextContent(item.label);
    }
  });

  it('relie la navigation aux sections de la page', () => {
    renderHome();
    const nav = screen.getByRole('navigation', { name: 'Sections du site' });
    for (const item of NAV_ITEMS) {
      expect(within(nav).getByRole('link', { name: item.label })).toHaveAttribute('href', `#${item.id}`);
    }
  });

  it('présente chaque projet avec un lien vers sa page, et sa démo, son code ou la mention du dépôt privé', () => {
    renderHome();
    for (const project of projects) {
      const article = screen.getByRole('article', { name: project.name });
      // Le calcul du nom accessible de Testing Library colle le texte masqué au texte visible.
      const details = within(article).getByRole('link', { name: /^Voir le projet/ });
      expect(details).toHaveTextContent(`Voir le projet ${project.name}`);
      expect(details).toHaveAttribute('href', withBase(projectPath(project.id)));
      if (project.code.kind === 'private') {
        expect(article).toHaveTextContent('Dépôt privé');
      } else {
        expect(within(article).getByRole('link', { name: /^Code source/ })).toHaveAttribute(
          'href',
          project.code.href,
        );
      }
    }
  });

  it('affiche la capture des projets qui en ont une, avec un texte alternatif', () => {
    renderHome();
    for (const project of projects) {
      if (!project.image) continue;
      const article = screen.getByRole('article', { name: project.name });
      const image = within(article).getByRole('img');
      expect(image).toHaveAttribute('alt', project.image.alt);
      expect(image).toHaveAttribute('src', withBase(`/captures/${project.image.fileName}`));
    }
  });

  it('ouvre les liens externes dans un nouvel onglet, sans window.opener', () => {
    renderHome();
    const external = externalLinks();
    expect(external.length).toBeGreaterThan(0);
    for (const link of external) {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });

  it('donne un nom distinct à chaque lien de projet', () => {
    renderHome();
    const names = screen
      .getAllByRole('link')
      .map((link) => link.textContent ?? '')
      .filter((name) => /^(Démo|Code source de |Voir le projet )/.test(name));
    expect(names.length).toBeGreaterThanOrEqual(projects.length);
    expect(new Set(names).size).toBe(names.length);
  });

  it('propose le CV en téléchargement et un contact par e-mail', () => {
    renderHome();
    const cvLinks = screen.getAllByRole('link', { name: /CV/ });
    expect(cvLinks.length).toBeGreaterThan(0);
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
    const { container } = renderHome();
    expect(container.querySelector('a[href^="tel:"]')).toBeNull();
    expect(container.textContent).not.toMatch(/0[1-9](?:[\s.\u00a0]?\d{2}){4}/);
  });
});

describe('page projet', () => {
  it.each(projects.map((project) => [project.name, project] as const))(
    '%s : titre principal, description, points techniques et technologies',
    (_name, project) => {
      render(<App path={projectPath(project.id)} />);

      const headings = screen.getAllByRole('heading', { level: 1 });
      expect(headings).toHaveLength(1);
      expect(headings[0]).toHaveTextContent(project.name);

      const article = screen.getByRole('article', { name: project.name });
      expect(article).toHaveTextContent(project.description.replaceAll('\u00a0', ' '));
      for (const highlight of project.highlights) {
        expect(article).toHaveTextContent(highlight.replaceAll('\u00a0', ' '));
      }
      const stack = screen.getByRole('complementary', { name: 'Technologies' });
      expect(within(stack).getAllByRole('listitem')).toHaveLength(project.stack.length);
    },
  );

  it('renvoie vers l’accueil et vers les autres projets', () => {
    const [first, ...others] = projects;
    if (!first) throw new Error('Aucun projet dans les données');
    render(<App path={projectPath(first.id)} />);

    expect(screen.getByRole('link', { name: profile.name })).toHaveAttribute('href', withBase('/'));
    expect(screen.getByRole('link', { name: 'Tous les projets' })).toHaveAttribute(
      'href',
      `${withBase('/')}#projets`,
    );

    const nav = screen.getByRole('navigation', { name: 'Autres projets' });
    const links = within(nav).getAllByRole('link');
    expect(links.map((link) => link.getAttribute('href'))).toEqual(
      others.map((project) => withBase(projectPath(project.id))),
    );
  });

  it('garde le contact et surligne « Projets » dans la navigation', () => {
    const [first] = projects;
    if (!first) throw new Error('Aucun projet dans les données');
    const { container } = render(<App path={projectPath(first.id)} />);

    expect(container.querySelector('section#contact')).not.toBeNull();
    const nav = screen.getByRole('navigation', { name: 'Sections du site' });
    expect(within(nav).getByRole('link', { name: 'Projets' })).toHaveAttribute('aria-current', 'true');
    expect(within(nav).getByRole('link', { name: 'Projets' })).toHaveAttribute(
      'href',
      `${withBase('/')}#projets`,
    );
    expect(within(nav).getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '#contact');
  });

  it('ouvre aussi ses liens externes dans un nouvel onglet', () => {
    const withDemo = projects.find((project) => project.demo !== undefined);
    if (!withDemo) throw new Error('Aucun projet avec démo dans les données');
    render(<App path={projectPath(withDemo.id)} />);
    for (const link of externalLinks()) {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });
});

describe('page introuvable', () => {
  it('affiche un message et un retour à l’accueil pour une adresse inconnue', () => {
    render(<App path="/projets/inconnu/" />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Page introuvable');
    expect(screen.getByRole('link', { name: 'Revenir à l’accueil' })).toHaveAttribute('href', withBase('/'));
  });
});
