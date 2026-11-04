import type { Education, Language } from '../content/types';

interface EducationListProps {
  items: readonly Education[];
  languages: readonly Language[];
}

export function EducationList({ items, languages }: EducationListProps) {
  return (
    <ol className="entries">
      {items.map((item) => (
        <li key={item.id} className="entry">
          <p className="entry__meta">{item.period}</p>
          <div className="entry__body">
            <h3 className="entry__title">{item.degree}</h3>
            <p className="entry__subtitle">{item.school}</p>
          </div>
        </li>
      ))}
      <li className="entry">
        <p className="entry__meta">Langues</p>
        <div className="entry__body">
          <p>{languages.map((language) => `${language.name} (${language.level})`).join(', ')}</p>
        </div>
      </li>
    </ol>
  );
}
