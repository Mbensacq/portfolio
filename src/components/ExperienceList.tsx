import type { Experience } from '../content/types';

interface ExperienceListProps {
  items: readonly Experience[];
}

export function ExperienceList({ items }: ExperienceListProps) {
  return (
    <ol className="experiences">
      {items.map((item) => (
        <li key={item.id} className="experience">
          <div className="experience__summary">
            <p className="experience__period">{item.period}</p>
            <h3 className="experience__role">
              {item.role}
              <span className="experience__contract">, {item.contract}</span>
            </h3>
            <p className="experience__company">
              {item.company}, {item.place}
            </p>
            <p className="stack">
              <span className="sr-only">Technologies utilisées : </span>
              {item.stack.join(', ')}
            </p>
          </div>

          <div className="experience__details">
            <ul className="experience__highlights">
              {item.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>

            {item.followUp ? (
              <div className="experience__follow-up">
                <h4 className="experience__follow-up-title">
                  {item.followUp.title}
                  <span className="experience__follow-up-period">, {item.followUp.period}</span>
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
