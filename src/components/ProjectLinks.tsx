import type { Project } from '../content/types';
import { projectPath, withBase } from '../routing';
import { ExternalLink } from './ExternalLink';

interface ProjectLinksProps {
  project: Project;
  /** Lien vers la page du projet : affiché dans les listes, pas sur la page elle-même. */
  showDetails: boolean;
}

/** Liens d'un projet : page détaillée, démo, code source ou mention du dépôt privé. */
export function ProjectLinks({ project, showDetails }: ProjectLinksProps) {
  return (
    <ul className="project-links">
      {showDetails ? (
        <li>
          <a href={withBase(projectPath(project.id))}>
            Voir le projet<span className="sr-only"> {project.name}</span>
          </a>
        </li>
      ) : null}
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
          <span className="project-links__private">Dépôt privé, code montré sur demande</span>
        )}
      </li>
    </ul>
  );
}
