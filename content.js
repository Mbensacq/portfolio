/* =============================================================
   content.js — Source de vérité du portfolio (bilingue FR / EN)
   Alignée sur le CV de Mathis Bensacq.
   Aucune dépendance : objets globaux consommés par script.js.
   ============================================================= */

/* ---------- Chaînes d'interface (UI) ---------- */
const I18N = {
  fr: {
    meta: {
      title: "Mathis Bensacq — Développeur Full Stack JavaScript",
      description:
        "Mathis Bensacq, développeur full stack JavaScript (React, Node.js, TypeScript) basé à Talence. Disponible immédiatement pour un CDI.",
    },
    a11y: {
      skip: "Aller au contenu principal",
      menu: "Ouvrir le menu",
      theme: "Basculer le thème clair / sombre",
      lang: "Switch to English",
      top: "Revenir en haut",
    },
    nav: {
      about: "À propos",
      skills: "Compétences",
      journey: "Parcours",
      projects: "Projets",
      contact: "Contact",
      cv: "Télécharger le CV",
    },
    hero: {
      status: "Disponible immédiatement",
      role: "Développeur Full Stack JavaScript",
      stack: "React · Node.js · TypeScript",
      tagline:
        "Je transforme des besoins métier en applications web fiables, mesurables et agréables à utiliser — de l'interface React jusqu'à l'API Node.js et la base de données.",
      ctaPrimary: "Me contacter",
      ctaSecondary: "Télécharger le CV",
      scroll: "Découvrir",
    },
    stats: {
      s1: "de temps gagné sur la création des devis (AAS)",
      s2: "projets full stack conçus et déployés",
      s3: "anglais professionnel",
    },
    about: {
      kicker: "À propos",
      title: "Transformer un besoin métier en logiciel fiable",
      p1: "Développeur full stack JavaScript, je conçois des applications web de bout en bout : des interfaces React soignées jusqu'aux API Node.js sécurisées et aux bases de données. Titulaire d'une Licence Informatique à l'Université de Bordeaux, j'ai complété une année de Master Génie Logiciel avant de choisir d'entrer pleinement dans le monde professionnel.",
      p2: "Lors de mon expérience chez AAS, j'ai livré une application métier utilisée en production qui a réduit d'environ 40 % le temps de création des devis. J'aime ce moment où un besoin flou devient une solution claire, robuste et mesurable.",
      p3: "Aujourd'hui, je recherche un poste de développeur en CDI où contribuer dès le premier jour et continuer à monter en compétences sur des projets concrets.",
      factsTitle: "En bref",
      factLocation: "Localisation",
      factLocationValue: "Talence (33), France · Permis B",
      factEducation: "Formation",
      factEducationValue: "Licence Informatique — Université de Bordeaux",
      factLanguages: "Langues",
      factLanguagesValue: "Français (natif) · Anglais (C1)",
      factAvailability: "Disponibilité",
      factAvailabilityValue: "Immédiate · CDI",
    },
    skills: {
      kicker: "Compétences",
      title: "Ma boîte à outils",
      note: "Les technologies avec lesquelles je conçois, développe et déploie au quotidien.",
    },
    journey: {
      kicker: "Parcours",
      title: "Expérience & formation",
      expLabel: "Expérience",
      eduLabel: "Formation",
      seeLive: "Voir en ligne",
    },
    projects: {
      kicker: "Projets",
      title: "Projets sélectionnés",
      note: "Une sélection de projets personnels qui reflètent ma façon de travailler.",
      all: "Voir tout sur GitHub",
      repo: "Code",
      demo: "Démo",
      private: "Dépôt privé",
    },
    status: {
      wip: "En développement",
      active: "Amélioré en continu",
      personal: "Projet personnel",
      live: "En ligne",
    },
    contact: {
      kicker: "Contact",
      title: "Travaillons ensemble",
      intro:
        "Un poste à pourvoir, une question, ou simplement l'envie d'échanger ? Je réponds rapidement.",
      directTitle: "Me joindre directement",
      cv: "Télécharger mon CV (PDF)",
      formName: "Votre nom",
      formNamePh: "Recruteur, manager, collaborateur…",
      formEmail: "Votre email",
      formEmailPh: "vous@entreprise.com",
      formMessage: "Votre message",
      formMessagePh: "Bonjour Mathis, nous recherchons un développeur…",
      formSubmit: "Envoyer le message",
    },
    footer: {
      tagline: "Conçu & développé par Mathis Bensacq",
      rights: "Tous droits réservés.",
    },
  },

  en: {
    meta: {
      title: "Mathis Bensacq — Full-Stack JavaScript Developer",
      description:
        "Mathis Bensacq, full-stack JavaScript developer (React, Node.js, TypeScript) based in Talence, France. Available immediately for a full-time role.",
    },
    a11y: {
      skip: "Skip to main content",
      menu: "Open menu",
      theme: "Toggle light / dark theme",
      lang: "Passer en français",
      top: "Back to top",
    },
    nav: {
      about: "About",
      skills: "Skills",
      journey: "Journey",
      projects: "Projects",
      contact: "Contact",
      cv: "Download résumé",
    },
    hero: {
      status: "Available right now",
      role: "Full-Stack JavaScript Developer",
      stack: "React · Node.js · TypeScript",
      tagline:
        "I turn business needs into reliable, measurable web apps that are a pleasure to use — from the React interface to the Node.js API and the database.",
      ctaPrimary: "Get in touch",
      ctaSecondary: "Download résumé",
      scroll: "Scroll",
    },
    stats: {
      s1: "less time spent creating quotes (AAS)",
      s2: "full-stack projects built and shipped",
      s3: "professional English",
    },
    about: {
      kicker: "About",
      title: "Turning business needs into reliable software",
      p1: "I'm a full-stack JavaScript developer who builds web apps end to end: from polished React interfaces to secure Node.js APIs and databases. I hold a BSc in Computer Science from the University of Bordeaux and completed a year of a Software Engineering Master's before choosing to move fully into professional work.",
      p2: "During my time at AAS, I shipped a production business app that cut quote-creation time by around 40%. I love the moment a fuzzy need becomes a clear, robust and measurable solution.",
      p3: "I'm now looking for a full-time developer role where I can contribute from day one and keep growing on real-world projects.",
      factsTitle: "At a glance",
      factLocation: "Location",
      factLocationValue: "Talence (33), France · Driving licence",
      factEducation: "Education",
      factEducationValue: "BSc Computer Science — University of Bordeaux",
      factLanguages: "Languages",
      factLanguagesValue: "French (native) · English (C1)",
      factAvailability: "Availability",
      factAvailabilityValue: "Immediate · full-time",
    },
    skills: {
      kicker: "Skills",
      title: "My toolbox",
      note: "The technologies I use to design, build and ship every day.",
    },
    journey: {
      kicker: "Journey",
      title: "Experience & education",
      expLabel: "Experience",
      eduLabel: "Education",
      seeLive: "View live",
    },
    projects: {
      kicker: "Projects",
      title: "Selected projects",
      note: "A selection of personal projects that reflect how I work.",
      all: "See everything on GitHub",
      repo: "Code",
      demo: "Demo",
      private: "Private repo",
    },
    status: {
      wip: "In progress",
      active: "Actively improved",
      personal: "Personal project",
      live: "Live",
    },
    contact: {
      kicker: "Contact",
      title: "Let's work together",
      intro:
        "A role to fill, a question, or simply want to chat? I reply quickly.",
      directTitle: "Reach me directly",
      cv: "Download my résumé (PDF)",
      formName: "Your name",
      formNamePh: "Recruiter, manager, teammate…",
      formEmail: "Your email",
      formEmailPh: "you@company.com",
      formMessage: "Your message",
      formMessagePh: "Hi Mathis, we're looking for a developer…",
      formSubmit: "Send message",
    },
    footer: {
      tagline: "Designed & built by Mathis Bensacq",
      rights: "All rights reserved.",
    },
  },
};

/* ---------- Données structurées (partagées, champs localisés fr/en) ---------- */

// Valeurs des statistiques du hero (neutres) — libellés dans I18N.stats
const STATS = [
  { value: "≈ 40 %", key: "s1" },
  { value: "4", key: "s2" },
  { value: "C1", key: "s3" },
];

const SKILLS = [
  {
    icon: "frontend",
    fr: "Frontend",
    en: "Frontend",
    items: ["React", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3"],
  },
  {
    icon: "backend",
    fr: "Backend",
    en: "Backend",
    items: ["Node.js", "Express.js", "API REST", "Auth sécurisée"],
  },
  {
    icon: "database",
    fr: "Bases de données",
    en: "Databases",
    items: ["PostgreSQL", "MySQL / MariaDB", "Supabase"],
  },
  {
    icon: "tools",
    fr: "Outils",
    en: "Tools",
    items: ["Git", "GitHub", "Docker", "VS Code"],
  },
  {
    icon: "spark",
    fr: "Aussi à l'aise avec",
    en: "Also working with",
    items: ["Python", "C#", "Unity"],
  },
];

const EXPERIENCE = [
  {
    org: "SAS Accès Automatismes Systèmes",
    demo: "https://pro.aas33.com/",
    metricValue: "≈ 40 %",
    fr: {
      role: "Développeur Full Stack",
      type: "CDD",
      period: "Juin – Juillet 2024",
      place: "Talence (33)",
      metric: "de temps gagné sur la création des devis",
      points: [
        "Conçu et développé une application web de génération de devis (React, Node.js) qui a réduit d'environ 40 % le temps de création.",
        "Développé des API REST sécurisées et la gestion des utilisateurs.",
        "Participé à la conception de la base de données et de l'architecture applicative.",
        "Mis en production des outils d'automatisation : relance automatique des factures et tableau de bord du chiffre d'affaires.",
        "Recueilli les besoins des utilisateurs métier et fait évoluer les fonctionnalités.",
      ],
    },
    en: {
      role: "Full-Stack Developer",
      type: "Fixed-term",
      period: "Jun – Jul 2024",
      place: "Talence, France",
      metric: "less time spent creating quotes",
      points: [
        "Designed and built a business web app for generating quotes (React, Node.js) that cut creation time by around 40%.",
        "Developed secure REST APIs and user management.",
        "Contributed to the database design and application architecture.",
        "Shipped automation tools to production: automatic invoice reminders and a revenue dashboard.",
        "Gathered business users' needs and iterated on features.",
      ],
    },
  },
];

const EDUCATION = [
  {
    fr: {
      title: "Licence Informatique",
      org: "Université de Bordeaux",
      period: "2025",
      note: "Mention Assez Bien · +1 an de Master Génie Logiciel",
    },
    en: {
      title: "BSc Computer Science",
      org: "University of Bordeaux",
      period: "2025",
      note: "With honours · +1 year of a Software Engineering Master's",
    },
  },
  {
    fr: {
      title: "Baccalauréat Général",
      org: "Spécialités Mathématiques & NSI",
      period: "2022",
      note: "Mention Assez Bien",
    },
    en: {
      title: "French Baccalauréat",
      org: "Majors: Mathematics & Computer Science (NSI)",
      period: "2022",
      note: "With honours",
    },
  },
];

const PROJECTS = [
  {
    key: "vtt",
    status: "active",
    tech: ["React", "Node.js", "Supabase"],
    repo: "https://github.com/Mbensacq/vtt",
    isPrivate: true, // dépôt privé (404 public) — pas de lien mort
    demo: null,
    featured: true,
    fr: {
      name: "Table virtuelle — Donjons & Dragons",
      blurb:
        "Plateforme web pour les maîtres du jeu : cartes interactives, gestion des joueurs et bibliothèque de ressources de campagne. Architecture full stack, données stockées via Supabase.",
    },
    en: {
      name: "Virtual Tabletop — Dungeons & Dragons",
      blurb:
        "A web platform for game masters: interactive maps, player management and a campaign resource library. Full-stack architecture with data stored on Supabase.",
    },
  },
  {
    key: "plume",
    status: "personal",
    tech: ["Python", "Whisper", "CUDA"],
    repo: "https://github.com/Mbensacq/plume",
    demo: null,
    featured: false,
    fr: {
      name: "Plume — transcription audio",
      blurb:
        "Application desktop de reconnaissance vocale basée sur le modèle Whisper, accélérée par GPU (CUDA). Restitue ponctuation et intonations pour une transcription fidèle.",
    },
    en: {
      name: "Plume — audio transcription",
      blurb:
        "A desktop speech-to-text app built on the Whisper model, GPU-accelerated with CUDA. Restores punctuation and intonation for faithful transcripts.",
    },
  },
  {
    key: "productivity",
    status: "personal",
    tech: ["TypeScript"],
    repo: "https://github.com/Mbensacq/productivity",
    demo: null,
    featured: false,
    fr: {
      name: "Base de connaissances — prise de notes",
      blurb:
        "Outil personnel de prise de notes : pages structurées en base de données et notes interconnectées par liens bidirectionnels, à la manière d'un « second cerveau ».",
    },
    en: {
      name: "Knowledge base — note-taking",
      blurb:
        "A personal note-taking tool: database-backed structured pages and notes interconnected through bidirectional links — a personal “second brain”.",
    },
  },
  {
    key: "game",
    status: "wip",
    tech: ["Unity", "C#"],
    repo: null,
    demo: null,
    featured: false,
    fr: {
      name: "Jeu vidéo point & click",
      blurb:
        "Jeu d'aventure point & click en cours de développement : logique de jeu et interface sous Unity (C#). Sortie publique prévue.",
    },
    en: {
      name: "Point & click video game",
      blurb:
        "A point-and-click adventure game in progress: game logic and UI built in Unity (C#). Public release planned.",
    },
  },
];

const LINKS = {
  email: "bensacqmathis@gmail.com",
  phone: "+33651958694",
  phoneDisplay: "06 51 95 86 94",
  github: "https://github.com/Mbensacq",
  linkedin: "https://www.linkedin.com/in/mathis-bensacq",
  cv: "assets/Mathis_Bensacq_CV.pdf",
  formspree: "https://formspree.io/f/xpqaeeeb",
};
