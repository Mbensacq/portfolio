import type { Education, Experience, Fact, Language, Profile, Project, SkillGroup } from './types';

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

export const facts: readonly Fact[] = [
  {
    id: 'devis',
    value: '40\u00a0%',
    text: 'de temps gagné sur chaque devis, avec l’application que j’ai mise en production en 2024 pour une PME girondine.',
  },
  {
    id: 'agents',
    value: '170+',
    text: 'pull requests fusionnées par l’équipe d’agents IA que j’ai conçue pour aqfish.',
  },
  {
    id: 'projets',
    value: '5',
    text: 'projets aboutis, du temps réel pair-à-pair à la dictée vocale locale sur carte graphique.',
  },
];

/** Phrase d'introduction de la section Projets. */
export const projectsIntro =
  'Les cinq projets que je considère aboutis, chacun avec sa page. D’autres sont en cours et les rejoindront une fois assez avancés.';

export const projects: readonly Project[] = [
  {
    id: 'atlas',
    name: 'Atlas',
    kicker: 'Temps réel, pair-à-pair',
    tagline: 'Table de jeu virtuelle pour Donjons & Dragons',
    description:
      'Application web temps réel en pair-à-pair\u00a0: fiches de personnage, cartes avec brouillard de guerre, suivi d’initiative et chat. Le site est entièrement statique, sans serveur ni compte, et chaque invitation porte un jeton aléatoire de 128\u00a0bits.',
    highlights: [
      'Le navigateur du maître du jeu héberge la partie\u00a0: les données restent chez les joueurs, aucune ne passe par un serveur.',
      'Invitations par lien, chacune protégée par un jeton aléatoire de 128\u00a0bits.',
      'Campagne sauvegardée automatiquement dans le navigateur et exportable en JSON.',
      'Scènes avec carte et brouillard de guerre, pions, dés, suivi de combat et chat.',
    ],
    stack: ['TypeScript', 'WebRTC', 'tests unitaires', 'GitHub Actions', 'GitHub Pages'],
    image: {
      fileName: 'atlas.jpg',
      alt: 'Écran d’accueil de la table de jeu\u00a0: créer une partie, rejoindre avec un lien d’invitation, sauvegardes',
      width: 1440,
      height: 900,
    },
    demo: 'https://mbensacq.github.io/atlas/',
    code: { kind: 'private' },
  },
  {
    id: 'aqfish',
    name: 'aqfish',
    kicker: 'Orchestration d’agents IA',
    tagline: 'Simulateur d’aquarium 3D développé par une équipe d’agents IA',
    description:
      'J’ai conçu le socle du projet et la chaîne d’agents (planification, développement, tests, revue, supervision)\u00a0; les agents écrivent l’application et la livrent en continu. Plus de 170\u00a0pull requests fusionnées à ce jour.',
    highlights: [
      'Chaque cycle enchaîne planification, développement, tests de bout en bout et revue\u00a0; le suivant démarre dès que le précédent se termine.',
      'Un agent superviseur publie un rapport quotidien, un autre relance la chaîne si elle s’arrête.',
      'J’ai préparé le socle à la main (outillage, règles d’équipe, feuille de route)\u00a0; toute l’application est écrite par les agents.',
      'Aquarium en pixel art 3D que l’on fait tourner à la souris, avec plusieurs milieux\u00a0: bac tropical, bassin à koïs, paludarium, récif.',
    ],
    stack: ['orchestration d’agents IA', 'tâches planifiées', 'Angular', 'Three.js', 'GitHub Actions'],
    image: {
      fileName: 'aqfish.jpg',
      alt: 'Aquarium en pixel art 3D avec poissons, plantes et roches, entouré du tableau de bord de la qualité de l’eau',
      width: 1440,
      height: 900,
    },
    demo: 'https://mbensacq.github.io/aqfish/',
    code: { kind: 'public', href: 'https://github.com/Mbensacq/aqfish' },
  },
  {
    id: 'productivity',
    name: 'Productivity',
    kicker: 'Hors ligne d’abord',
    tagline: 'Base de connaissances en Markdown',
    description:
      'Notes reliées par des liens bidirectionnels, graphe interactif, recherche plein texte côté PostgreSQL et synchronisation hors ligne avec écritures optimistes. Les données de chaque utilisateur sont isolées par Row Level Security.',
    highlights: [
      'Éditeur Markdown (CodeMirror\u00a06) avec autocomplétion des liens entre notes et création de note à la volée.',
      'Recherche plein texte PostgreSQL doublée d’un index côté client, accessible depuis une palette de commandes.',
      'Cache persistant dans IndexedDB, écritures optimistes et synchronisation entre appareils par Supabase Realtime.',
      'Isolation des données par Row Level Security, vérifiée par des tests pgTAP.',
    ],
    stack: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'TanStack Query', 'Vitest', 'GitHub Actions'],
    code: { kind: 'public', href: 'https://github.com/Mbensacq/productivity' },
  },
  {
    id: 'nexa',
    name: 'Nexa',
    kicker: 'Back-end et exploitation',
    tagline: 'Bot Discord de gestion de communauté',
    description:
      'Modération, économie, niveaux et tickets de support, activables serveur par serveur, en français et en anglais. Données PostgreSQL via Prisma, métriques Prometheus et sauvegardes automatiques.',
    highlights: [
      'Modules activables serveur par serveur\u00a0: modération, économie, niveaux, tickets de support.',
      'Interface disponible en français et en anglais.',
      'Données PostgreSQL via Prisma, avec sauvegardes automatiques.',
      'Métriques exposées pour Prometheus, déploiement en conteneur Docker.',
    ],
    stack: ['TypeScript', 'Node.js', 'discord.js', 'Prisma', 'PostgreSQL', 'Docker', 'Vitest'],
    code: { kind: 'private' },
  },
  {
    id: 'plume',
    name: 'Plume',
    kicker: 'Application native',
    tagline: 'Dictée vocale locale pour Windows',
    description:
      'Dictée entièrement locale, écrite en Rust\u00a0: un raccourci lance l’écoute et le texte, ponctué, est collé là où se trouve le curseur, dans n’importe quelle application. La reconnaissance utilise Whisper, sur la carte graphique quand c’est possible, avec repli automatique sur le processeur.',
    highlights: [
      'Transcription pendant la dictée, découpée aux pauses\u00a0: à l’arrêt, il ne reste que la fin à traiter.',
      'Un seul exécutable, sans installation\u00a0; le modèle se télécharge au premier lancement.',
      'Réglages dans un fichier texte commenté\u00a0: raccourci, modèle, vocabulaire, corrections.',
      'Réécriture en Rust d’une première version en Python, archivée dans le dépôt.',
    ],
    stack: ['Rust', 'Whisper (whisper.cpp)', 'Vulkan', 'GitHub Actions'],
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
