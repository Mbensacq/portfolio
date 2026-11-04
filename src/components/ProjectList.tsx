import type { Project } from '../content/types';
import { ExternalLink } from './ExternalLink';

interface ProjectListProps {
  items: readonly Project[];
}

export function ProjectList({ items }: ProjectListProps) {
  return (
    <ul className="projects">
      {items.map((project) => {
        const headingId = `projet-${project.id}`;
        return (
          <li key={project.id} className="project">
            <article aria-labelledby={headingId}>
              <h3 id={headingId} className="project__name">
                {project.name}
              </h3>
              <p className="project__tagline">{project.tagline}</p>
              <p className="project__description">{project.description}</p>
              <p className="stack">
                <span className="sr-only">Technologies utilisées : </span>
                {project.stack.join(', ')}
              </p>
              <ul className="project__links">
                {project.demo ? (
                  <li>
                    <ExternalLink href={project.demo}>
                      Démo en ligne<span className="sr-only"> de {project.name}</span>
                    </ExternalLink>
                  </li>
                ) : null}
                <li>
                  {project.code.kind === 'public' ? (
                    <ExternalLink href={project.code.href}>
                      Code source<span className="sr-only"> de {project.name}</span>
                    </ExternalLink>
                  ) : (
                    <span className="project__private">Dépôt privé, code montré sur demande</span>
                  )}
                </li>
              </ul>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
