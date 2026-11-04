export interface ExternalLink {
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  title: string;
  stack: readonly string[];
  availability: {
    headline: string;
    detail: string;
  };
  email: string;
  linkedin: ExternalLink;
  github: ExternalLink;
  cv: {
    fileName: string;
    sizeLabel: string;
  };
  lead: string;
  intro: readonly string[];
  sourceCode: string;
  siteUrl: string;
}

export interface Experience {
  id: string;
  period: string;
  role: string;
  contract: string;
  company: string;
  place: string;
  highlights: readonly string[];
  stack: readonly string[];
  followUp?: {
    period: string;
    title: string;
    text: string;
  };
}

/** Où se trouve le code d'un projet : dépôt public lié, ou dépôt privé montré sur demande. */
export type ProjectCode = { kind: 'public'; href: string } | { kind: 'private' };

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  stack: readonly string[];
  demo?: string;
  code: ProjectCode;
}

export interface SkillGroup {
  label: string;
  items: readonly string[];
}

export interface Education {
  id: string;
  period: string;
  degree: string;
  school: string;
}

export interface Language {
  name: string;
  level: string;
}
