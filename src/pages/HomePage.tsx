import { EducationList } from '../components/EducationList';
import { ExperienceList } from '../components/ExperienceList';
import { FactList } from '../components/FactList';
import { ProjectList } from '../components/ProjectList';
import { Section } from '../components/Section';
import { SkillList } from '../components/SkillList';
import {
  education,
  experiences,
  facts,
  languages,
  profile,
  projects,
  projectsIntro,
  skills,
} from '../content/data';

export function HomePage() {
  return (
    <>
      <div className="intro">
        <p className="intro__lead">{profile.lead}</p>
        {profile.intro.map((paragraph) => (
          <p key={paragraph} className="intro__text">
            {paragraph}
          </p>
        ))}
      </div>

      <FactList items={facts} />

      <Section id="projets" intro={projectsIntro}>
        <ProjectList items={projects} />
      </Section>

      <Section id="experience">
        <ExperienceList items={experiences} />
      </Section>

      <Section id="competences">
        <SkillList groups={skills} />
      </Section>

      <Section id="formation">
        <EducationList items={education} languages={languages} />
      </Section>
    </>
  );
}
