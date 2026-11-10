import type { Education, Language } from '../content/types';

interface EducationListProps {
  items: readonly Education[];
  languages: readonly Language[];
}

export function EducationList({ items, languages }: EducationListProps) {
  return (
    <ol className="education">
      {items.map((item) => (
        <li key={item.id} className="education__item">
          <p className="education__period">{item.period}</p>
          <h3 className="education__degree">{item.degree}</h3>
          <p className="education__school">{item.school}</p>
        </li>
      ))}
      <li className="education__item">
        <p className="education__period">Langues</p>
        <ul className="education__languages">
          {languages.map((language) => (
            <li key={language.name}>
              <span className="education__degree">{language.name}</span>
              <span className="education__school">, {language.level}</span>
            </li>
          ))}
        </ul>
      </li>
    </ol>
  );
}
