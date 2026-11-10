import { profile } from '../content/data';
import { NAV_ITEMS, SECTION_IDS, type SectionId } from '../content/navigation';
import { useActiveSection } from '../hooks/useActiveSection';
import { HOME_PATH, publicUrl, withBase } from '../routing';
import { ExternalLink } from './ExternalLink';

interface SidebarProps {
  /** Sur l'accueil, le nom est le titre principal et la navigation suit le défilement. */
  isHome: boolean;
  /** Section à surligner hors de l'accueil (page d'un projet), ou null. */
  currentSection: SectionId | null;
}

export function Sidebar({ isHome, currentSection }: SidebarProps) {
  const scrolledSection = useActiveSection(SECTION_IDS, isHome);
  const activeSection = isHome ? scrolledSection : currentSection;
  const homeHref = withBase(HOME_PATH);

  return (
    <header className="band">
      <div className="band__inner">
        <div className="band__identity">
          {isHome ? (
            <h1 className="band__name">{profile.name}</h1>
          ) : (
            <p className="band__name">
              <a href={homeHref}>{profile.name}</a>
            </p>
          )}
          <p className="band__title">{profile.title}</p>
          <p className="band__stack">{profile.stack.join(', ')}</p>
        </div>

        <div className="band__availability">
          <p className="band__availability-headline">{profile.availability.headline}</p>
          <p className="band__availability-detail">{profile.availability.detail}</p>
        </div>

        <div className="band__actions">
          <a className="button button--light" href={publicUrl(profile.cv.fileName)} download>
            Télécharger mon CV
            <span className="button__meta"> ({profile.cv.sizeLabel})</span>
          </a>
          <a className="button button--outline-light" href={`mailto:${profile.email}`}>
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

        <nav className="band__nav" aria-label="Sections du site">
          <ul>
            {NAV_ITEMS.map((item) => {
              // Le contact est en pied de chaque page ; les autres sections sont sur l'accueil.
              const href = isHome || item.id === 'contact' ? `#${item.id}` : `${homeHref}#${item.id}`;
              const isActive = item.id === activeSection;
              return (
                <li key={item.id}>
                  <a href={href} aria-current={isActive ? 'true' : undefined}>
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
