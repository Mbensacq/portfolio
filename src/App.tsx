import { Contact } from './components/Contact';
import { EducationList } from './components/EducationList';
import { ExperienceList } from './components/ExperienceList';
import { ExternalLink } from './components/ExternalLink';
import { ProjectList } from './components/ProjectList';
import { Section } from './components/Section';
import { Sidebar } from './components/Sidebar';
import { SkillList } from './components/SkillList';
import { education, experiences, languages, profile, projects, skills } from './content/data';

export function App() {
  return (
    <div className="layout">
      <a className="skip-link" href="#contenu">
        Aller au contenu
      </a>
      <Sidebar />

      <main id="contenu" className="content" tabIndex={-1}>
        <div className="intro">
          <p className="intro__lead">{profile.lead}</p>
          {profile.intro.map((paragraph) => (
            <p key={paragraph} className="intro__text">
              {paragraph}
            </p>
          ))}
        </div>

        <Section id="experience">
          <ExperienceList items={experiences} />
        </Section>

        <Section id="projets">
          <ProjectList items={projects} />
        </Section>

        <Section id="competences">
          <SkillList groups={skills} />
        </Section>

        <Section id="formation">
          <EducationList items={education} languages={languages} />
        </Section>

        <Section id="contact">
          <Contact />
        </Section>

        <footer className="footer">
          <p>
            <ExternalLink href={profile.sourceCode}>Code source de ce site</ExternalLink> (React, TypeScript,
            Vite)
          </p>
        </footer>
      </main>
    </div>
  );
}
