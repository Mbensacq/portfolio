import { ProjectImage } from '../components/ProjectImage';
import { ProjectLinks } from '../components/ProjectLinks';
import { projects } from '../content/data';
import type { Project } from '../content/types';
import { HOME_PATH, projectPath, withBase } from '../routing';

interface ProjectPageProps {
  project: Project;
}

export function ProjectPage({ project }: ProjectPageProps) {
  const others = projects.filter((entry) => entry.id !== project.id);

  return (
    <article className="project-page" aria-labelledby="projet-titre">
      <p className="project-page__back">
        <a href={`${withBase(HOME_PATH)}#projets`}>Tous les projets</a>
      </p>

      <header className="project-page__header">
        <p className="kicker">{project.kicker}</p>
        <h1 id="projet-titre" className="project-page__name">
          {project.name}
        </h1>
        <p className="project-page__tagline">{project.tagline}</p>
        <ProjectLinks project={project} showDetails={false} />
      </header>

      {project.image ? (
        <div className="project-page__media">
          <ProjectImage image={project.image} eager />
        </div>
      ) : null}

      <div className="project-page__columns">
        <div className="project-page__main">
          <h2 className="project-page__heading">Le projet</h2>
          <p className="project-page__description">{project.description}</p>

          <h2 className="project-page__heading">Points techniques</h2>
          <ul className="project-page__highlights">
            {project.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>

        <aside className="project-page__aside" aria-labelledby="projet-stack">
          <h2 id="projet-stack" className="project-page__aside-title">
            Technologies
          </h2>
          <ul className="project-page__stack">
            {project.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </div>

      <nav className="project-page__others" aria-labelledby="autres-projets">
        <h2 id="autres-projets" className="project-page__heading">
          Autres projets
        </h2>
        <ul>
          {others.map((entry) => (
            <li key={entry.id}>
              <a href={withBase(projectPath(entry.id))}>
                <span className="project-page__other-name">{entry.name}</span>
                <span className="project-page__other-tagline">{entry.tagline}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </article>
  );
}
