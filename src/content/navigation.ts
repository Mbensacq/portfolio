/** Sections de la page, dans l'ordre d'affichage : ancres de la navigation latérale. */
export const NAV_ITEMS = [
  { id: 'experience', label: 'Expérience' },
  { id: 'projets', label: 'Projets' },
  { id: 'competences', label: 'Compétences' },
  { id: 'formation', label: 'Formation' },
  { id: 'contact', label: 'Contact' },
] as const;

export type SectionId = (typeof NAV_ITEMS)[number]['id'];

export function sectionTitle(id: SectionId): string {
  const item = NAV_ITEMS.find((entry) => entry.id === id);
  if (!item) throw new Error(`Section inconnue : ${id}`);
  return item.label;
}
