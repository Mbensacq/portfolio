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

/** Chiffre clé mis en avant sous l'introduction. */
export interface Fact {
  id: string;
  value: string;
  text: string;
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

/** Capture d'écran d'un projet, servie depuis public/captures/. */
export interface ProjectImage {
  fileName: string;
  alt: string;
  width: number;
  height: number;
}

export interface Project {
  /** Sert aussi de segment d'URL : /projets/<id>/ */
  id: string;
  name: string;
  /** Angle technique du projet, en quelques mots. */
  kicker: string;
  tagline: string;
  description: string;
  /** Points techniques détaillés sur la page du projet. */
  highlights: readonly string[];
  stack: readonly string[];
  image?: ProjectImage;
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
