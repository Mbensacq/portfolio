import { Contact } from './components/Contact';
import { ExternalLink } from './components/ExternalLink';
import { Section } from './components/Section';
import { Sidebar } from './components/Sidebar';
import { profile } from './content/data';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProjectPage } from './pages/ProjectPage';
import { resolveRoute } from './routing';

interface AppProps {
  /** Chemin de la page, relatif à la base du site : « / », « /projets/atlas/ ». */
  path: string;
}

export function App({ path }: AppProps) {
  const route = resolveRoute(path);

  return (
    <div className="layout">
      <a className="skip-link" href="#contenu">
        Aller au contenu
      </a>
      <Sidebar
        isHome={route.kind === 'home'}
        currentSection={route.kind === 'project' ? 'projets' : null}
      />

      <main id="contenu" className="content" tabIndex={-1}>
        <div className="content__inner">
          {route.kind === 'home' ? <HomePage /> : null}
          {route.kind === 'project' ? <ProjectPage project={route.project} /> : null}
          {route.kind === 'not-found' ? <NotFoundPage /> : null}

          <Section id="contact">
            <Contact />
          </Section>

          <footer className="footer">
            <p>
              <ExternalLink href={profile.sourceCode}>Code source de ce site</ExternalLink> (React,
              TypeScript, Vite)
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
