import type { Project } from '../content/types';
import { ProjectImage } from './ProjectImage';
import { ProjectLinks } from './ProjectLinks';

interface ProjectListProps {
  items: readonly Project[];
}

function Stack({ items }: { items: readonly string[] }) {
  return (
    <p className="stack">
      <span className="sr-only">Technologies utilisées : </span>
      {items.join(', ')}
    </p>
  );
}

/** Projets avec capture en grandes lignes alternées, puis les autres en cartes. */
export function ProjectList({ items }: ProjectListProps) {
  const featured = items.filter((project) => project.image !== undefined);
  const others = items.filter((project) => project.image === undefined);

  return (
    <div className="projects">
      {featured.length > 0 ? (
        <ul className="features">
          {featured.map((project) => {
            const headingId = `projet-${project.id}`;
            return (
              <li key={project.id} className="feature">
                <article aria-labelledby={headingId} className="feature__article">
                  {project.image ? (
                    <div className="feature__media">
                      <ProjectImage image={project.image} />
                    </div>
                  ) : null}
                  <div className="feature__body">
                    <p className="kicker">{project.kicker}</p>
                    <h3 id={headingId} className="feature__name">
                      {project.name}
                    </h3>
                    <p className="feature__tagline">{project.tagline}</p>
                    <p className="feature__description">{project.description}</p>
                    <Stack items={project.stack} />
                    <ProjectLinks project={project} showDetails />
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      ) : null}

      {others.length > 0 ? (
        <ul className="cards">
          {others.map((project) => {
            const headingId = `projet-${project.id}`;
            return (
              <li key={project.id} className="card">
                <article aria-labelledby={headingId} className="card__article">
                  <p className="kicker">{project.kicker}</p>
                  <h3 id={headingId} className="card__name">
                    {project.name}
                  </h3>
                  <p className="card__tagline">{project.tagline}</p>
                  <p className="card__description">{project.description}</p>
                  <Stack items={project.stack} />
                  <ProjectLinks project={project} showDetails />
                </article>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
