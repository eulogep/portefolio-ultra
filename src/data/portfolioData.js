/**
 * Données du portfolio – Version Premium
 * Auteur : MABIALA EULOGE (Euloge Mabiala)
 * Objectif : fichier prêt à brancher sur un site React/Next/Vue.
 * Style : orienté valeur (problème → solution → impact), chiffres d'impact mis en avant.
 * Langue : FR
 * Dernière maj : 2025-08-14
 */

export const personalInfo = {
  name: 'Euloge Mabiala',
  title: 'Ingénieur Logiciel (Étudiant ESIEA) – Dev, IA & Cybersécurité',
  headline: "J'aide les équipes à livrer des produits fiables, testés et beaux – du proof-of-concept à la prod.",
  shortDescription:
    "Développeur full‑stack orienté impact. J'aime concevoir des interfaces propres, des APIs robustes et des automations intelligentes (Voiceflow/Make).",
  description:
    "Créatif et orienté solution, je construis des apps web modernes (React/Vue), des services Python (FastAPI) et des agents IA pragmatiques. Je valorise les tests, l'accessibilité, la performance et la sécurité.",
  email: 'mabiala@et.esiea.fr',
  phone: '+33 7 60 83 09 31',
  location: 'Paris, France',
  availability: 'Alternance à partir de septembre 2025 (2–3 j/semaine)',
  links: {
    linkedin: 'https://www.linkedin.com/in/euloge-junior-mabiala',
    github: 'https://github.com/eulogep',
    x: 'https://x.com/',
    portfolio: 'https://eulogep.github.io/',
  },
  keywords: [
    'Full‑stack', 'React', 'Vue', 'Python', 'FastAPI', 'Cypress', 'IA', 'Voiceflow', 'Make', 'Cybersécurité', 'DevOps basique'
  ],
  languages: [
    { name: 'Français', level: 'C2 – natif' },
    { name: 'Anglais', level: 'B2 en progression (objectif TOEIC ≥ 800)' }
  ],
  heroCTA: {
    primary: { label: 'Voir mes projets', href: '#projects' },
    secondary: { label: 'Télécharger mon CV (PDF)', href: '/cv-euloge-mabiala.pdf' }
  }
};

export const achievements = [
  { label: 'Tests E2E', value: '15+' },
  { label: 'Utilisateurs servis', value: '200+' },
  { label: 'Conversations IA', value: '500+' },
  { label: 'Perf Lighthouse', value: '95/100' }
];

export const skills = [
  { name: 'JavaScript / TypeScript', level: 90, color: '#F7DF1E', category: 'frontend' },
  { name: 'React', level: 88, color: '#61DAFB', category: 'frontend' },
  { name: 'Vue.js', level: 84, color: '#4FC08D', category: 'frontend' },
  { name: 'HTML/CSS (Tailwind)', level: 95, color: '#E34F26', category: 'frontend' },
  { name: 'Python (FastAPI)', level: 85, color: '#3776AB', category: 'backend' },
  { name: 'Node.js (Express)', level: 78, color: '#339933', category: 'backend' },
  { name: 'Tests (Cypress)', level: 82, color: '#17202C', category: 'quality' },
  { name: 'Git/GitHub', level: 85, color: '#F05032', category: 'tools' },
  { name: 'Automations (Make, Voiceflow)', level: 80, color: '#6E56CF', category: 'automation' }
];

export const softSkills = [
  'Orientation produit',
  'Esprit d\'équipe',
  'Pédagogie',
  'Curiosité technique',
  'Résolution de problèmes',
  'Autonomie',
  'Communication claire'
];

export const tools = [
  'React', 'Next.js', 'Vue', 'Vite', 'Tailwind CSS', 'TypeScript', 'Zustand/Pinia',
  'Python', 'FastAPI', 'Node.js', 'Express', 'Docker (bases)',
  'Cypress', 'Playwright (bases)', 'Vitest/Jest',
  'Voiceflow', 'Make.com', 'Git', 'GitHub/GitLab',
  'Figma', 'Photoshop', 'Illustrator'
];

export const education = [
  {
    date: '2022 – 2025',
    title: "Cycle Ingénieur en Informatique",
    institution: 'ESIEA',
    description: 'Dév. logiciel, cybersécurité, IA appliquée. Projets web, tests, automations.',
    location: 'Paris, France'
  },
  {
    date: '2022',
    title: 'Baccalauréat Scientifique',
    institution: 'Lycée',
    description: "Option Sciences de l'Ingénieur.",
    location: 'France'
  }
];

export const experiences = [
  {
    date: 'Sept 2024 – Jan 2025',
    title: 'Employé Polyvalent',
    institution: 'Five Guys',
    description: 'Flux tendu, priorisation, qualité de service. Compétences transférables : rigueur, réactivité, travail en équipe.',
    skills: ['Gestion du temps', 'Communication', 'Travail d\'équipe']
  }
];

export const projects = [
  {
    id: 'calculatrice-vue',
    title: 'Calculatrice Web – Vue + Pinia + Cypress',
    pitch: "Refonte d'une calculatrice web en SPA pour apprendre l'archi Vue moderne et l'ingénierie de tests. Résultat : UI fluide, état maîtrisé, régression quasi nulle.",
    role: 'Développeur Front & QA',
    technologies: ['Vue', 'Pinia', 'Cypress', 'TypeScript', 'HTML', 'CSS'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
    github: 'https://github.com/eulogep/double-calculatrice',
    demo: 'https://eulogep.github.io/double-calculatrice/',
    status: 'fini',
    category: 'Web Development',
    featured: true,
    year: 2024,
    highlights: [
      'Architecture modulaire + état centralisé',
      '15 tests E2E et unitaires clés',
      'Accessibilité et responsive soignés',
      'Perf Lighthouse 95/100'
    ],
    impact: {
      tests: '15 E2E',
      performance: '95/100',
      features: '8 fonctionnalités'
    }
  },
  {
    id: 'chatbot-voiceflow',
    title: 'Chatbot IA – Voiceflow x Make x Google Sheets',
    pitch: "Assistant éducatif & commercial avec classification d'intentions et intégrations API. But : répondre vite, capturer les leads et automatiser les actions back‑office.",
    role: 'Concepteur conversationnel & intégrateur',
    technologies: ['Voiceflow', 'Webhooks', 'Google Sheets', 'Make.com'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    github: 'https://github.com/eulogep/ai-chatbot-voiceflow',
    demo: 'https://voiceflow-chatbot-demo.vercel.app/',
    status: 'en cours',
    category: 'AI/ML',
    featured: true,
    year: 2024,
    highlights: [
      'Gestion des intents + slots',
      '3 APIs intégrées via Make',
      'Base de connaissance Q/R',
      'Capture automatique des leads'
    ],
    impact: {
      conversations: '500+ conversations',
      accuracy: '≈ 92% de réponses pertinentes',
      integrations: '3 APIs'
    }
  },
  {
    id: 'beewise-dashboard',
    title: 'BeeWise – Dashboard IoT Apiculture',
    pitch: "Centralisation de mesures capteurs (ruche) + alertes. Objectif : visibilité en temps réel et décisions rapides.",
    role: 'Dev back Python + intégrations',
    technologies: ['Python', 'Redis', 'Discord Bot', 'IoT'],
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&h=600&fit=crop',
    github: 'https://gitlab.com/mabialaeulogejunior-group/beewise-dashboard',
    demo: 'https://beewise-demo.vercel.app/',
    status: 'élaboration',
    category: 'IoT',
    featured: true,
    year: 2024,
    highlights: [
      'Ingestion de données multi‑capteurs',
      'Alertes temps réel Discord',
      'Cache Redis pour perfs'
    ],
    impact: {
      sensors: '12 capteurs',
      data: '10k+ points collectés',
      alerts: 'Alertes temps réel'
    }
  },
  {
    id: 'hip-hop-master',
    title: 'Hip‑Hop Master – Plateforme de réservation',
    pitch: "Site de formation danse avec gestion des cours, paiements et réservations. Focus : UX simple et tunnel de conversion propre.",
    role: 'Full‑stack (React/Node)',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    image: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=800&h=600&fit=crop',
    github: 'https://github.com/eulogep/hip-hop-master',
    demo: 'https://hip-hop-master.vercel.app/',
    status: 'fini',
    category: 'Web Development',
    featured: false,
    year: 2023,
    highlights: [
      'Tunnel de paiement Stripe',
      'Tableau de bord réservations',
      'Emailing transactionnel'
    ],
    impact: {
      users: '200+ utilisateurs',
      bookings: '150+ réservations',
      revenue: 'Paiements en prod'
    }
  },
  {
    id: 'mentorbot-evolution',
    title: 'MentorBot Evolution – Agent IA perso',
    pitch: "Coach d'apprentissage propulsé par IA : suivi d'objectifs, rappels, fiches et feedback instant.",
    role: 'Architecte & dev Python/React',
    technologies: ['Python', 'OpenAI', 'FastAPI', 'React'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    github: 'https://github.com/eulogep/mentorbot-evolution',
    demo: 'https://eulogep.github.io/mentorbotevolution/',
    status: 'en cours',
    category: 'AI/ML',
    featured: true,
    year: 2024,
    highlights: [
      'Planification intelligente',
      'Cartes mémoire auto‑générées',
      'Interface web minimaliste'
    ],
    impact: {
      sessions: '300+ sessions',
      satisfaction: '4.8/5',
      features: 'IA conversationnelle'
    }
  },
  {
    id: 'simulateur-brute-force',
    title: 'Simulateur Brute Force – Pédagogie sécurité',
    pitch: "Petit outil pour comprendre coût/temps d'attaques par force brute (éducatif, sensibilisation).",
    role: 'Dev full‑stack léger (Flask + JS)',
    technologies: ['Python', 'Flask', 'JavaScript', 'Bootstrap'],
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=600&fit=crop',
    github: 'https://github.com/eulogep/simulateur-brute-force',
    demo: 'https://eulogep.github.io/Simulateur-Brute-Force/',
    status: 'fini',
    category: 'Cybersecurity',
    featured: false,
    year: 2023,
    highlights: [
      'Paramétrage complexité/longueur',
      'Visualisation du temps estimé',
      'Messages pédagogiques clairs'
    ],
    impact: {
      simulations: '1000+ simulations',
      educational: 'Utilisé en vulgarisation',
      security: 'Sensibilisation sécurité'
    }
  }
];

export const certifications = [
  {
    name: 'Google Cybersécurité (Cert.)',
    status: 'en cours',
    date: '2024–2025',
    issuer: 'Google',
    credentialId: 'À venir'
  },
  {
    name: 'HTML/CSS/JS',
    status: 'terminé',
    date: '2023',
    issuer: 'freeCodeCamp / OpenClassrooms',
    credentialId: 'Plusieurs modules'
  }
];

export const timeline = [
  { year: '2022', title: 'Entrée ESIEA', description: "Début du cycle ingénieur.", type: 'education' },
  { year: '2023', title: 'Projets Web & IA', description: 'Premiers projets concrets et tests.', type: 'project' },
  { year: '2024', title: 'Exp. pro – Five Guys', description: 'Rigueur & travail en équipe.', type: 'work' },
  { year: '2025', title: 'Recherche Alternance', description: 'Ingénierie logicielle.', type: 'goal' }
];

export const testimonials = [
  {
    name: 'Professeur ESIEA',
    role: 'Enseignant Informatique',
    content: "Euloge apprend vite, structure bien ses projets et sait expliquer ses choix techniques.",
    rating: 5
  },
  {
    name: 'Manager Five Guys',
    role: 'Responsable d\'équipe',
    content: 'Très bon esprit d\'équipe, fiable et autonome dans l\'exécution.',
    rating: 5
  }
];

export const valueProposition = [
  {
    title: 'Pourquoi moi ?',
    bullets: [
      'Je livre : démos en ligne, tests, docs courtes et utiles.',
      'Je simplifie : interfaces nettes, libellés clairs, zéro jargon inutile.',
      'Je mesure : perfs, taux d\'erreur, métriques produit visibles.',
      'Je m\'adapte : stack React/Vue côté front, Python/Node côté back.'
    ]
  }
];

export const callsToAction = [
  { id: 'cta-contact', label: 'Me contacter', href: 'mailto:mabiala@et.esiea.fr', kind: 'primary' },
  { id: 'cta-github', label: 'Voir mon GitHub', href: 'https://github.com/eulogep', kind: 'secondary' },
  { id: 'cta-cv', label: 'Télécharger le CV', href: '/cv-euloge-mabiala.pdf', kind: 'ghost' }
];

export const uiHints = {
  featuredFirst: true,
  showMetricsBadges: true,
  groupSkillsByCategory: true,
  projectCardLayout: 'grid-3',
  theme: {
    accent: '#6E56CF',
    rounded: '2xl',
    shadows: 'soft'
  }
};

// Legacy exports for compatibility with existing components
export const funFacts = achievements;

export default {
  personalInfo,
  skills,
  tools,
  softSkills,
  education,
  experiences,
  projects,
  certifications,
  achievements,
  testimonials,
  valueProposition,
  callsToAction,
  timeline,
  uiHints,
  funFacts
};
