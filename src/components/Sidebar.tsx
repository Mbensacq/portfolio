import { profile } from '../content/data';
import { NAV_ITEMS } from '../content/navigation';
import { ExternalLink } from './ExternalLink';

export function Sidebar() {
  const cvHref = `${import.meta.env.BASE_URL}${profile.cv.fileName}`;

  return (
    <header className="band">
      <div className="band__inner">
        <div className="band__identity">
          <h1 className="band__name">{profile.name}</h1>
          <p className="band__title">{profile.title}</p>
          <p className="band__stack">{profile.stack.join(', ')}</p>
        </div>

        <div className="band__availability">
          <p className="band__availability-headline">{profile.availability.headline}</p>
          <p className="band__availability-detail">{profile.availability.detail}</p>
        </div>

        <div className="band__actions">
          <a className="button button--primary" href={cvHref} download>
            Télécharger mon CV
            <span className="button__meta"> ({profile.cv.sizeLabel})</span>
          </a>
          <a className="button button--secondary" href={`mailto:${profile.email}`}>
            M’écrire
          </a>
        </div>

        <ul className="band__links">
          <li>
            <ExternalLink href={profile.linkedin.href}>{profile.linkedin.label}</ExternalLink>
          </li>
          <li>
            <ExternalLink href={profile.github.href}>{profile.github.label}</ExternalLink>
          </li>
        </ul>

        <nav className="band__nav" aria-label="Sections de la page">
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
