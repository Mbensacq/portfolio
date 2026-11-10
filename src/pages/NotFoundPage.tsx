import { HOME_PATH, withBase } from '../routing';

export function NotFoundPage() {
  return (
    <div className="not-found">
      <h1 className="not-found__title">Page introuvable</h1>
      <p>Cette adresse ne correspond à aucune page du site.</p>
      <p>
        <a href={withBase(HOME_PATH)}>Revenir à l’accueil</a>
      </p>
    </div>
  );
}
