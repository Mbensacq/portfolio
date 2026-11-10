import type { Fact } from '../content/types';

interface FactListProps {
  items: readonly Fact[];
}

/** Chiffres clés : la valeur en grand, sa signification en dessous. */
export function FactList({ items }: FactListProps) {
  return (
    <ul className="facts" aria-label="Repères">
      {items.map((fact) => (
        <li key={fact.id} className="fact">
          <p>
            <strong className="fact__value">{fact.value}</strong>{' '}
            <span className="fact__text">{fact.text}</span>
          </p>
        </li>
      ))}
    </ul>
  );
}
