import { profile } from '../content/data';
import { ExternalLink } from './ExternalLink';

export function Contact() {
  const cvHref = `${import.meta.env.BASE_URL}${profile.cv.fileName}`;

  return (
    <div className="contact">
      <p className="contact__lead">
        {'Vous recrutez à Bordeaux ou dans sa métropole\u00a0? Le plus simple est de m’écrire.'}
      </p>
      <p>
        <a className="contact__email" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
      </p>
      <ul className="contact__links">
        <li>
          <ExternalLink href={profile.linkedin.href}>{profile.linkedin.label}</ExternalLink>
        </li>
        <li>
          <ExternalLink href={profile.github.href}>{profile.github.label}</ExternalLink>
        </li>
        <li>
          <a href={cvHref} download>
            CV au format PDF
          </a>
        </li>
      </ul>
    </div>
  );
}
