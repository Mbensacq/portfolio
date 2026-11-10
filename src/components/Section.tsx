import type { ReactNode } from 'react';
import { sectionTitle, type SectionId } from '../content/navigation';

interface SectionProps {
  id: SectionId;
  /** Phrase courte affichée à côté du titre. */
  intro?: string;
  children: ReactNode;
}

/** Section de premier niveau ; son titre est celui de la navigation, pour qu'ils ne divergent pas. */
export function Section({ id, intro, children }: SectionProps) {
  const headingId = `${id}-titre`;
  const title = sectionTitle(id);
  return (
    <section id={id} className="section" aria-labelledby={headingId}>
      <div className="section__header">
        <h2 id={headingId} className="section__title">
          {title}
        </h2>
        {intro ? <p className="section__intro">{intro}</p> : null}
      </div>
      {children}
    </section>
  );
}
