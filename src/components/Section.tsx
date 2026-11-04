import type { ReactNode } from 'react';
import { sectionTitle, type SectionId } from '../content/navigation';

interface SectionProps {
  id: SectionId;
  children: ReactNode;
}

/** Section de premier niveau ; son titre est celui de la navigation, pour qu'ils ne divergent pas. */
export function Section({ id, children }: SectionProps) {
  const headingId = `${id}-titre`;
  const title = sectionTitle(id);
  return (
    <section id={id} className="section" aria-labelledby={headingId}>
      <h2 id={headingId} className="section__title">
        {title}
      </h2>
      {children}
    </section>
  );
}
