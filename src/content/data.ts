import type { Education, Experience, Language, Profile, Project, SkillGroup } from './types';

// Typographie française : espace insécable (\u00a0) avant « : ; ? ! % » et dans les dates.

export const profile: Profile = {
  name: 'Mathis Bensacq',
  title: 'Développeur full stack junior',
  stack: ['TypeScript', 'React', 'Node.js', 'SQL'],
  availability: {
    headline: 'Disponible immédiatement',
    detail: 'CDI à Bordeaux et dans sa métropole, sur site ou en hybride.',
  },
  email: 'bensacqmathis@gmail.com',
  linkedin: { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mathis-bensacq' },
  github: { label: 'GitHub', href: 'https://github.com/Mbensacq' },
  cv: { fileName: 'Mathis_BENSACQ_CV.pdf', sizeLabel: 'PDF' },
  lead: 'Je conçois et je livre des applications web complètes, de la base PostgreSQL à l’interface React.',
  intro: [
    'En 2024, j’ai mis en production l’application de devis d’une PME girondine\u00a0: elle a réduit de 40\u00a0% le temps de création de chaque devis.',
    'Je code en TypeScript avec des tests automatisés et de l’intégration continue, et je sais piloter des agents IA de développement, jusqu’à une équipe d’agents qui code, teste et relit une application en continu.',
  ],
  sourceCode: 'https://github.com/Mbensacq/portfolio',
  siteUrl: 'https://mbensacq.github.io/portfolio/',
};

export const experiences: readonly Experience[] = [
  {
    id: 'aas',
    period: 'Juin – juillet 2024',
    role: 'Développeur full stack',
    contract: 'CDD',
    company: 'SAS Accès Automatismes Systèmes',
    place: 'Blésignac (33)',
    highlights: [
      'Conception et développement d’une application web de devis en React et Node.js\u00a0: 40\u00a0% de temps gagné sur la création de chaque devis.',
      'Back-end Node.js et gestion sécurisée des comptes utilisateurs.',
      'Participation à la conception de la base PostgreSQL et de l’architecture.',
      'Recueil des besoins auprès des utilisateurs métier et évolution des fonctionnalités.',
    ],
    stack: ['React', 'Node.js', 'JavaScript', 'PostgreSQL', 'Git'],
    followUp: {
      period: '2026',
      title: 'Mise à jour bénévole de l’application',
      text: 'Refonte ponctuelle sous Laravel (bases) avec des agents IA\u00a0: configurateur, boutique, signature, factures, relance des impayés et tableau de bord du chiffre d’affaires.',
    },
  },
];

export const projects: readonly Project[] = [
  {
    id: 'al-dm',
    name: 'AL-DM',
    tagline: 'Table de jeu virtuelle pour Donjons & Dragons',
    description:
      'Application web temps réel en pair-à-pair\u00a0: fiches de personnage, cartes avec brouillard de guerre, suivi d’initiative et chat. Le site est entièrement statique, sans serveur ni compte, et chaque invitation porte un jeton aléatoire de 128\u00a0bits.',
    stack: ['TypeScript', 'WebRTC', 'tests unitaires', 'GitHub Actions', 'GitHub Pages'],
    demo: 'https://mbensacq.github.io/al-dm/',
    code: { kind: 'private' },
  },
  {
    id: 'productivity',
    name: 'Productivity',
    tagline: 'Base de connaissances en Markdown',
    description:
      'Notes reliées par des liens bidirectionnels, graphe interactif, recherche plein texte côté PostgreSQL et synchronisation hors ligne avec écritures optimistes. Les données de chaque utilisateur sont isolées par Row Level Security.',
    stack: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'TanStack Query', 'Vitest', 'GitHub Actions'],
    code: { kind: 'public', href: 'https://github.com/Mbensacq/productivity' },
  },
  {
    id: 'nexa',
    name: 'Nexa',
    tagline: 'Bot Discord de gestion de communauté',
    description:
      'Modération, économie, niveaux et tickets de support, activables serveur par serveur, en français et en anglais. Données PostgreSQL via Prisma, métriques Prometheus et sauvegardes automatiques.',
    stack: ['TypeScript', 'Node.js', 'discord.js', 'Prisma', 'PostgreSQL', 'Docker', 'Vitest'],
    code: { kind: 'private' },
  },
  {
    id: 'aqfish',
    name: 'aqfish',
    tagline: 'Simulateur d’aquarium 3D développé par une équipe d’agents IA',
    description:
      'J’ai conçu le socle du projet et la chaîne d’agents (planification, développement, tests, revue, supervision)\u00a0; les agents écrivent l’application et la livrent en continu. Plus de 170\u00a0pull requests fusionnées à ce jour.',
    stack: ['orchestration d’agents IA', 'tâches planifiées', 'GitHub Actions'],
    demo: 'https://mbensacq.github.io/aqfish/',
    code: { kind: 'public', href: 'https://github.com/Mbensacq/aqfish' },
  },
  {
    id: 'plume',
    name: 'Plume',
    tagline: 'Dictée vocale locale pour Windows',
    description:
      'Transcription hors ligne avec Whisper, accélérée sur GPU avec repli automatique sur le processeur. Capture du micro et du son du PC, texte ponctué en français, saisie directe dans la fenêtre active.',
    stack: ['Python', 'Whisper', 'CUDA', 'Tkinter'],
    code: { kind: 'public', href: 'https://github.com/Mbensacq/plume' },
  },
];

export const skills: readonly SkillGroup[] = [
  { label: 'Front-end', items: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS'] },
  { label: 'Back-end', items: ['Node.js', 'Express', 'Laravel (bases)', 'Spring Boot (formation)'] },
  { label: 'Bases de données', items: ['PostgreSQL', 'MySQL / MariaDB', 'Supabase'] },
  { label: 'Autres langages', items: ['Java', 'Python', 'PHP', 'C'] },
  { label: 'Tests et qualité', items: ['Vitest', 'Testing Library', 'JUnit', 'ESLint'] },
  { label: 'Outils', items: ['Git', 'GitHub Actions', 'GitLab', 'Docker', 'Linux'] },
  { label: 'IA', items: ['agents de développement', 'orchestration multi-agents'] },
  { label: 'Méthodes', items: ['Scrum', 'UML', 'design patterns'] },
];

export const education: readonly Education[] = [
  {
    id: 'master',
    period: '2025 – 2026',
    degree: 'Master Génie Logiciel, 1re année',
    school: 'Université de Bordeaux',
  },
  {
    id: 'licence',
    period: '2022 – 2025',
    degree: 'Licence Informatique, mention Assez Bien',
    school: 'Université de Bordeaux',
  },
];

export const languages: readonly Language[] = [
  { name: 'Français', level: 'langue maternelle' },
  { name: 'Anglais', level: 'avancé, C1' },
];
