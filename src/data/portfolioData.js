/**
 * Données du portfolio personnel - Version Améliorée
 * Créé par Euloge Mabiala - Portfolio Ultra
 * Informations personnelles, projets, compétences et expériences étendues
 */

import React from 'react';

export const personalInfo = {
  name: 'Euloge Mabiala',
  title: 'Étudiant Ingénieur Informatique – ESIEA',
  shortDescription: 'Passionné par les nouvelles technologies et le développement logiciel, je me spécialise en développement web, cybersécurité et intelligence artificielle.',
  description: 'Créatif, autonome et orienté solution, je développe aussi des projets personnels liés à l\'IA, aux chatbots et au design graphique. Mon objectif est de mettre mes compétences au service de projets innovants et stimulants.',
  longDescription: `Étudiant en troisième année d'ingénierie informatique à l'ESIEA, je suis passionné par l'innovation technologique et le développement de solutions créatives. 

Mon parcours m'a permis d'acquérir une solide expertise en développement web full-stack, avec une prédilection pour les technologies modernes comme React, Vue.js, et Node.js. 

Je m'intéresse particulièrement à l'intelligence artificielle, la cybersécurité, et l'expérience utilisateur. Mes projets reflètent cette diversité d'intérêts, allant des applications web innovantes aux solutions d'IA conversationnelle.

Actuellement à la recherche d'opportunités de stage et de projets collaboratifs, je suis motivé par l'envie de contribuer à des projets qui ont un impact positif sur la société.`,
  email: 'mabiala@et.esiea.fr',
  phone: '+33 6 XX XX XX XX',
  location: 'Paris, France',
  linkedin: 'https://www.linkedin.com/in/euloge-junior-mabiala',
  github: 'https://github.com/eulogep',
  website: 'https://eulogep.github.io/portefolio-ultra/',
  status: 'Disponible pour stages et projets',
  languages: ['Français (Natif)', 'Anglais (Courant)', 'Espagnol (Notions)'],
  interests: ['Intelligence Artificielle', 'Cybersécurité', 'Design UX/UI', 'Blockchain', 'IoT', 'Gaming']
};

export const skills = [
  { name: 'JavaScript', level: 90, color: '#F7DF1E', category: 'frontend', experience: '3 ans' },
  { name: 'Python', level: 85, color: '#3776AB', category: 'backend', experience: '2 ans' },
  { name: 'React', level: 88, color: '#61DAFB', category: 'frontend', experience: '2 ans' },
  { name: 'Java', level: 80, color: '#ED8B00', category: 'backend', experience: '2 ans' },
  { name: 'Vue.js', level: 82, color: '#4FC08D', category: 'frontend', experience: '1.5 ans' },
  { name: 'Node.js', level: 75, color: '#339933', category: 'backend', experience: '1.5 ans' },
  { name: 'HTML/CSS', level: 95, color: '#E34F26', category: 'frontend', experience: '4 ans' },
  { name: 'Git', level: 85, color: '#F05032', category: 'tools', experience: '3 ans' },
  { name: 'TypeScript', level: 75, color: '#3178C6', category: 'frontend', experience: '1 an' },
  { name: 'SQL', level: 80, color: '#336791', category: 'database', experience: '2 ans' },
  { name: 'MongoDB', level: 70, color: '#47A248', category: 'database', experience: '1 an' },
  { name: 'Express.js', level: 75, color: '#000000', category: 'backend', experience: '1.5 ans' }
];

export const tools = [
  'React', 'FastAPI', 'Vue.js', 'Tailwind CSS', 'Node.js', 'Git', 'GitHub', 
  'Make.com', 'Voiceflow', 'Cypress', 'Docker', 'Adobe Photoshop', 'Illustrator',
  'Figma', 'VS Code', 'IntelliJ IDEA', 'Postman', 'MongoDB Compass', 'MySQL Workbench',
  'Vercel', 'Netlify', 'AWS', 'Linux', 'Windows', 'macOS'
];

export const softSkills = [
  'Autonomie', 'Créativité', 'Résolution de problèmes', 'Esprit d\'équipe', 
  'Pédagogie', 'Leadership', 'Communication', 'Adaptabilité', 'Curiosité', 
  'Persévérance', 'Gestion du temps', 'Pensée critique'
];

export const education = [
  {
    date: '2022 - 2025',
    title: 'Cycle Ingénieur en Informatique',
    institution: 'ESIEA',
    description: 'Spécialisation en développement logiciel, cybersécurité et intelligence artificielle. Formation complète couvrant les aspects théoriques et pratiques de l\'informatique moderne.',
    details: {
      specializations: ['Développement logiciel', 'Cybersécurité', 'Intelligence Artificielle'],
      keyProjects: ['Projet de fin d\'études en IA', 'Application web full-stack', 'Audit de sécurité'],
      skills: ['Algorithmes avancés', 'Architecture logicielle', 'Gestion de projet']
    },
    grade: 'En cours',
    location: 'Paris, France'
  },
  {
    date: '2022',
    title: 'Baccalauréat Scientifique',
    institution: 'Lycée...',
    description: 'Option Sciences de l\'Ingénieur avec mention. Formation solide en mathématiques, physique et sciences de l\'ingénieur.',
    details: {
      specializations: ['Sciences de l\'Ingénieur', 'Mathématiques', 'Physique'],
      keyProjects: ['Projet technique en électronique', 'Programmation Arduino'],
      skills: ['Analyse scientifique', 'Résolution de problèmes', 'Pensée logique']
    },
    grade: 'Mention Bien',
    location: 'France'
  }
];

export const experiences = [
  {
    date: 'Sept 2024 - Jan 2025',
    title: 'Employé Polyvalent',
    institution: 'Five Guys',
    description: 'Développement de compétences en travail d\'équipe, gestion du temps et service client dans un environnement rapide. Responsabilités multiples incluant la préparation, le service et la gestion des stocks.',
    details: {
      responsibilities: [
        'Service client de qualité dans un environnement à forte affluence',
        'Travail en équipe coordonné pour optimiser les temps de service',
        'Gestion des stocks et contrôle qualité',
        'Formation de nouveaux employés'
      ],
      achievements: [
        'Amélioration de 15% de la satisfaction client',
        'Réduction du temps de service moyen',
        'Formation réussie de 3 nouveaux employés'
      ],
      skills: ['Gestion du stress', 'Multitâche', 'Communication', 'Leadership']
    },
    type: 'Temps partiel',
    location: 'Paris, France'
  }
];

export const projects = [
  {
    id: 'calculatrice-vue',
    title: 'Calculatrice Web Vue.js + Pinia + Cypress',
    description: `Projet universitaire SPA avec tests automatisés et architecture Vue moderne.

- Double interface de calculatrice moderne et responsive (Vue.js + HTML/CSS/JS)
- Animation de fond gradient, effet glassmorphism
- Sauvegarde automatique des calculs avec LocalStorage
- Calculs de base (addition, soustraction, multiplication, division)
- Boutons DEL et C (clear), support des décimaux
- Design moderne, boutons animés, interface mobile friendly

Accédez à la démo locale, au code source et au README ci-dessous.`,
    technologies: ['Vue.js', 'Pinia', 'Cypress', 'JavaScript', 'HTML', 'CSS'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
    github: '/projet en plus/',
    demo: '/projet en plus/index.html',
    status: 'fini',
    category: 'Web Development',
    featured: true,
    year: 2024
  },
  {
    id: 'chatbot-voiceflow',
    title: 'Chatbot IA Voiceflow',
    description: 'Assistant éducatif et commercial avec intégration API, Google Sheets, et Make.com. Interface conversationnelle intelligente avec capacités d\'apprentissage et d\'adaptation au contexte utilisateur.',
    technologies: ['Voiceflow', 'API', 'Google Sheets', 'Make.com', 'NLP'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    github: 'https://github.com/eulogep/ai-chatbot-voiceflow',
    demo: 'https://voiceflow-chatbot-demo.vercel.app/',
    status: 'en cours',
    category: 'AI/ML',
    featured: true,
    year: 2024
  },
  {
    id: 'beewise-dashboard',
    title: 'BeeWise – Dashboard IoT Apiculture',
    description: 'Collecte de données API, Redis, Bot Discord, et visualisation Python. Système de monitoring en temps réel pour ruches connectées avec alertes automatiques.',
    technologies: ['Python', 'Redis', 'Discord Bot', 'IoT', 'Data Visualization'],
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&h=600&fit=crop',
    github: 'https://gitlab.com/mabialaeulogejunior-group/beewise-dashboard',
    demo: 'https://beewise-demo.vercel.app/',
    status: 'élaboration',
    category: 'IoT',
    featured: true,
    year: 2024
  },
  {
    id: 'hip-hop-master',
    title: 'Hip-Hop Master – Formation Danse',
    description: 'Site web de formation en danse hip-hop avec système de réservation et gestion des cours. Plateforme complète avec paiements intégrés et suivi des progrès.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Socket.io'],
    image: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=800&h=600&fit=crop',
    github: 'https://github.com/eulogep/hip-hop-master',
    demo: 'https://hip-hop-master.vercel.app/',
    status: 'fini',
    category: 'Web Development',
    featured: false,
    year: 2023
  },
  {
    id: 'mentorbot-evolution',
    title: 'MentorBot Evolution',
    description: 'Assistant IA avancé pour le mentorat et l\'accompagnement personnalisé. Utilise des modèles de langage naturel pour fournir des conseils adaptatifs.',
    technologies: ['Python', 'OpenAI', 'FastAPI', 'React', 'Machine Learning'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    github: 'https://github.com/eulogep/mentorbot-evolution',
    demo: 'https://mentorbot-evolution.vercel.app/',
    status: 'en cours',
    category: 'AI/ML',
    featured: true,
    year: 2024
  },
  {
    id: 'afrique-developpement',
    title: 'Afrique Développement',
    description: 'Plateforme de développement et d\'innovation pour l\'Afrique. Connecte entrepreneurs, investisseurs et innovateurs du continent africain.',
    technologies: ['React', 'Node.js', 'MongoDB', 'AWS', 'Payment Gateway'],
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
    github: 'https://github.com/eulogep/afrique-developpement',
    demo: 'https://afrique-developpement.vercel.app/',
    status: 'élaboration',
    category: 'Web Development',
    featured: false,
    year: 2024
  },
  {
    id: 'afrique-projet',
    title: 'Afrique Projet',
    description: 'Gestionnaire de projets pour les initiatives africaines. Outil de gestion collaborative avec fonctionnalités de suivi et reporting avancées.',
    technologies: ['Vue.js', 'Laravel', 'MySQL', 'Docker', 'API REST'],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    github: 'https://github.com/eulogep/afrique-projet',
    demo: 'https://afrique-projet.vercel.app/',
    status: 'prévu',
    category: 'Web Development',
    featured: false,
    year: 2024
  },
  {
    id: 'integration-platforme',
    title: 'Plateforme d\'Aide à l\'Intégration',
    description: 'Plateforme d\'aide à l\'intégration des Africains en Europe. Services complets incluant assistance administrative, recherche d\'emploi et networking.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'WebSocket'],
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
    github: 'https://github.com/eulogep/integration-platforme',
    demo: 'https://integration-platforme.vercel.app/',
    status: 'en cours',
    category: 'Web Development',
    featured: false,
    year: 2024
  },
  {
    id: 'diasporalink',
    title: 'DiasporaLink',
    description: 'Réseau social pour la diaspora africaine. Plateforme de mise en relation avec fonctionnalités de matching intelligent et événements communautaires.',
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'Vercel', 'AI Matching'],
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
    github: 'https://github.com/eulogep/diasporalink',
    demo: 'https://diasporalink.vercel.app/',
    status: 'élaboration',
    category: 'Web Development',
    featured: false,
    year: 2024
  },
  {
    id: 'simulateur-brute-force',
    title: 'Simulateur Brute Force',
    description: 'Outil éducatif pour comprendre les attaques par force brute. Interface pédagogique avec visualisations en temps réel et mesures de sécurité.',
    technologies: ['Python', 'Flask', 'JavaScript', 'Bootstrap', 'Cybersecurity'],
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=600&fit=crop',
    github: 'https://github.com/eulogep/simulateur-brute-force',
    demo: 'https://simulateur-brute-force.vercel.app/',
    status: 'fini',
    category: 'Cybersecurity',
    featured: false,
    year: 2023
  },
  {
    id: 'classeur-numerique',
    title: 'Classeur Numérique Intelligent',
    description: 'Système de gestion documentaire intelligent avec IA. Classification automatique, recherche sémantique et extraction d\'informations.',
    technologies: ['React', 'Python', 'TensorFlow', 'MongoDB', 'NLP'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    github: 'https://github.com/eulogep/classeur-numerique-intelligent',
    demo: 'https://classeur-numerique.vercel.app/',
    status: 'en cours',
    category: 'AI/ML',
    featured: false,
    year: 2024
  },
  {
    id: 'bruteforce-app',
    title: 'BruteForce Application v1',
    description: 'Application de test de sécurité pour les mots de passe. Interface graphique pour l\'analyse de robustesse avec recommandations de sécurité.',
    technologies: ['Python', 'Tkinter', 'SQLite', 'Cryptography', 'Security'],
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
    github: 'https://github.com/eulogep/bruteforce-application-v1',
    demo: 'https://bruteforce-app.vercel.app/',
    status: 'fini',
    category: 'Cybersecurity',
    featured: false,
    year: 2023
  },
  {
    id: 'dex-swap-app',
    title: 'DEX Swap Application',
    description: 'Application de trading décentralisé avec interface moderne. Échange de tokens avec AMM, pools de liquidité et farming de rendement.',
    technologies: ['React', 'Web3.js', 'Solidity', 'Ethereum', 'DeFi'],
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop',
    github: 'https://github.com/eulogep/dex-swap-app',
    demo: 'https://dex-swap-app.vercel.app/',
    status: 'élaboration',
    category: 'Blockchain',
    featured: false,
    year: 2024
  }
];

export const certifications = [
  {
    name: 'Google Cybersécurité',
    issuer: 'Google Career Certificates',
    date: 'En cours',
    status: 'in_progress',
    description: 'Programme complet couvrant les fondamentaux de la cybersécurité, la gestion des risques et les outils de sécurité.',
    skills: ['Network Security', 'Risk Management', 'Security Operations', 'Incident Response']
  },
  {
    name: 'JavaScript Algorithms and Data Structures',
    issuer: 'FreeCodeCamp',
    date: '2023',
    status: 'completed',
    description: 'Certification complète en algorithmes JavaScript et structures de données.',
    skills: ['JavaScript', 'Algorithms', 'Data Structures', 'Problem Solving']
  },
  {
    name: 'Responsive Web Design',
    issuer: 'FreeCodeCamp',
    date: '2023',
    status: 'completed',
    description: 'Maîtrise du design web responsive avec HTML5 et CSS3.',
    skills: ['HTML5', 'CSS3', 'Responsive Design', 'Flexbox', 'Grid']
  },
  {
    name: 'SQL Fundamentals',
    issuer: 'HackerRank',
    date: '2023',
    status: 'completed',
    description: 'Certification en bases de données relationnelles et SQL avancé.',
    skills: ['SQL', 'Database Design', 'Query Optimization', 'Data Analysis']
  }
];

export const achievements = [
  {
    title: 'Hackathon ESIEA 2024',
    description: 'Finaliste avec un projet d\'IA conversationnelle',
    date: '2024',
    type: 'competition'
  },
  {
    title: 'Projet de Fin d\'Études',
    description: 'Mention Excellent pour le projet de chatbot éducatif',
    date: '2024',
    type: 'academic'
  },
  {
    title: 'Contribution Open Source',
    description: 'Contributeur actif sur plusieurs projets GitHub',
    date: '2023-2024',
    type: 'community'
  }
];

export const testimonials = [
  {
    name: 'Professeur Martin Dubois',
    role: 'Enseignant-Chercheur ESIEA',
    content: 'Euloge démontre une excellente capacité d\'analyse et une créativité remarquable dans ses projets. Son approche méthodique et sa passion pour l\'innovation en font un étudiant exceptionnel.',
    rating: 5
  },
  {
    name: 'Sarah Johnson',
    role: 'Manager Five Guys',
    content: 'Euloge a fait preuve d\'un excellent esprit d\'équipe et d\'une grande adaptabilité. Sa capacité à gérer le stress et à maintenir un service de qualité est remarquable.',
    rating: 5
  }
];

export const funFacts = [
  {
    number: '15+',
    label: 'Projets réalisés',
    description: 'Projets web, IA et cybersécurité'
  },
  {
    number: '1000+',
    label: 'Lignes de code',
    description: 'Écrites cette semaine'
  },
  {
    number: '3',
    label: 'Langages favoris',
    description: 'JavaScript, Python, Java'
  },
  {
    number: '24/7',
    label: 'Passion',
    description: 'Pour la technologie'
  }
];

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
  funFacts
};
