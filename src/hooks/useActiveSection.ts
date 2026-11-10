import { useEffect, useState } from 'react';

/**
 * Identifiant de la section actuellement lue, pour surligner son lien dans la navigation.
 * Renvoie null au rendu serveur et tant qu'aucune section n'a atteint la zone de lecture.
 */
export function useActiveSection<Id extends string>(ids: readonly Id[], enabled: boolean): Id | null {
  const [active, setActive] = useState<Id | null>(null);

  useEffect(() => {
    if (!enabled || typeof IntersectionObserver === 'undefined') return;

    const visible = new Set<Id>();

    const update = () => {
      // En bas de page, la dernière section est trop courte pour atteindre la zone de lecture.
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      const last = ids.at(-1);
      if (atBottom && last !== undefined && window.scrollY > 0) {
        setActive(last);
        return;
      }
      // Plusieurs sections peuvent se chevaucher dans la zone : on garde la première de la page.
      const first = ids.find((id) => visible.has(id));
      if (first) setActive(first);
      else if (window.scrollY < 80) setActive(null);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id as Id;
          if (entry.isIntersecting) visible.add(id);
          else visible.delete(id);
        }
        update();
      },
      // Zone de lecture : une bande située dans le tiers haut de la fenêtre.
      { rootMargin: '-20% 0px -65% 0px' },
    );
    window.addEventListener('scroll', update, { passive: true });

    for (const id of ids) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', update);
    };
  }, [ids, enabled]);

  return active;
}
