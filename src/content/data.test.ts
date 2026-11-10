import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { education, experiences, facts, profile, projects, projectsIntro, skills } from './data';

// Vitest s'exécute depuis la racine du dépôt.
const publicDir = resolve(process.cwd(), 'public');

function allUrls(): string[] {
  const urls = [profile.linkedin.href, profile.github.href, profile.sourceCode, profile.siteUrl];
  for (const project of projects) {
    if (project.demo) urls.push(project.demo);
    if (project.code.kind === 'public') urls.push(project.code.href);
  }
  return urls;
}

describe('contenu', () => {
  it('utilise uniquement des URL https valides', () => {
    for (const url of allUrls()) {
      expect(() => new URL(url), url).not.toThrow();
      expect(new URL(url).protocol, url).toBe('https:');
    }
  });

  it('fournit le CV PDF référencé dans public/', () => {
    expect(existsSync(resolve(publicDir, profile.cv.fileName))).toBe(true);
  });

  it('fournit chaque capture de projet référencée dans public/captures/', () => {
    for (const project of projects) {
      if (!project.image) continue;
      expect(existsSync(resolve(publicDir, 'captures', project.image.fileName)), project.id).toBe(true);
      expect(project.image.alt.length, project.id).toBeGreaterThan(0);
    }
  });

  it('utilise des identifiants de projet valides comme segments d’URL', () => {
    for (const project of projects) {
      expect(project.id, project.id).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    }
  });

  it('détaille chaque projet par au moins deux points techniques, sans doublon', () => {
    for (const project of projects) {
      expect(project.highlights.length, project.id).toBeGreaterThanOrEqual(2);
      expect(new Set(project.highlights).size, project.id).toBe(project.highlights.length);
    }
  });

  it('garde des identifiants uniques (ancres et clés React)', () => {
    const ids = [
      ...projects.map((p) => p.id),
      ...experiences.map((e) => e.id),
      ...education.map((e) => e.id),
      ...facts.map((f) => f.id),
    ];
    expect(new Set(ids).size).toBe(ids.length);
    const labels = skills.map((group) => group.label);
    expect(new Set(labels).size).toBe(labels.length);
  });

  it('renseigne une stack pour chaque projet et chaque expérience', () => {
    for (const item of [...projects, ...experiences]) {
      expect(item.stack.length, item.id).toBeGreaterThan(0);
    }
  });

  it('respecte les espaces insécables avant « : ; ? ! % »', () => {
    const texts = [
      profile.lead,
      ...profile.intro,
      ...experiences.flatMap((e) => [...e.highlights, e.followUp?.text ?? '']),
      ...projects.flatMap((p) => [p.description, p.tagline, p.kicker, ...p.highlights, p.image?.alt ?? '']),
      ...facts.flatMap((f) => [f.value, f.text]),
      projectsIntro,
    ];
    for (const text of texts) {
      expect(text, text).not.toMatch(/ [:;?!%]/);
      expect(text, text).not.toMatch(/\S[;?!%]/u);
    }
  });
});
