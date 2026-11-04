import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { education, experiences, profile, projects, skills } from './data';

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

  it('garde des identifiants uniques (ancres et clés React)', () => {
    const ids = [...projects.map((p) => p.id), ...experiences.map((e) => e.id), ...education.map((e) => e.id)];
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
      ...projects.map((p) => p.description),
    ];
    for (const text of texts) {
      expect(text, text).not.toMatch(/ [:;?!%]/);
      expect(text, text).not.toMatch(/\S[;?!%]/u);
    }
  });
});
