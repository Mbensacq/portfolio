import type { Experience } from '../content/types';

interface ExperienceListProps {
  items: readonly Experience[];
}

export function ExperienceList({ items }: ExperienceListProps) {
  return (
    <ol className="entries">
      {items.map((item) => (
        <li key={item.id} className="entry">
          <p className="entry__meta">{item.period}</p>
          <div className="entry__body">
            <h3 className="entry__title">
              {item.role}
              <span className="entry__contract">, {item.contract}</span>
            </h3>
            <p className="entry__subtitle">
              {item.company}, {item.place}
            </p>
            <ul className="entry__highlights">
              {item.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            <p className="stack">
              <span className="sr-only">Technologies utilisées : </span>
              {item.stack.join(', ')}
            </p>

            {item.followUp ? (
              <div className="entry__follow-up">
                <h4 className="entry__follow-up-title">
                  {item.followUp.title}
                  <span className="entry__follow-up-period">, {item.followUp.period}</span>
                </h4>
                <p>{item.followUp.text}</p>
              </div>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
