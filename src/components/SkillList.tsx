import type { SkillGroup } from '../content/types';

interface SkillListProps {
  groups: readonly SkillGroup[];
}

export function SkillList({ groups }: SkillListProps) {
  return (
    <dl className="skills">
      {groups.map((group) => (
        <div key={group.label} className="skills__group">
          <dt>{group.label}</dt>
          <dd>{group.items.join(', ')}</dd>
        </div>
      ))}
    </dl>
  );
}
