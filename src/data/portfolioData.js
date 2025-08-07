/**
 * Données du portfolio personnel
 * Créé par Euloge Mabiala - Portfolio Ultra
 * Informations personnelles, projets, compétences et expériences
 */

import React from 'react';

export const personalInfo = {
  name: 'Euloge Mabiala',
  title: 'Étudiant Ingénieur Informatique – ESIEA',
  shortDescription: 'Passionné par les nouvelles technologies et le développement logiciel, je me spécialise en développement web, cybersécurité et intelligence artificielle.',
  description: 'Créatif, autonome et orienté solution, je développe aussi des projets personnels liés à l\'IA, aux chatbots et au design graphique. Mon objectif est de mettre mes compétences au service de projets innovants et stimulants.',
  email: 'mabiala@et.esiea.fr',
  linkedin: 'https://www.linkedin.com/in/euloge-junior-mabiala',
  github: 'https://github.com/eulogep',
};

export const skills = [
  { name: 'JavaScript', level: 90, color: '#F7DF1E' },
  { name: 'Python', level: 85, color: '#3776AB' },
  { name: 'React', level: 88, color: '#61DAFB' },
  { name: 'Java', level: 80, color: '#ED8B00' },
  { name: 'Vue.js', level: 82, color: '#4FC08D' },
  { name: 'Node.js', level: 75, color: '#339933' },
  { name: 'HTML/CSS', level: 95, color: '#E34F26' },
  { name: 'Git', level: 85, color: '#F05032' }
];

export const tools = ['React', 'FastAPI', 'Vue.js', 'Tailwind CSS', 'Node.js', 'Git', 'GitHub', 'Make.com', 'Voiceflow', 'Cypress', 'Docker', 'Adobe Photoshop', 'Illustrator'];

export const softSkills = ['Autonomie', 'Créativité', 'Résolution de problèmes', 'Esprit d\'équipe', 'Pédagogie'];

export const education = [
  {
    date: '2022 - 2025',
    title: 'Cycle Ingénieur en Informatique',
    institution: 'ESIEA',
    description: 'Spécialisation en développement logiciel, cybersécurité et intelligence artificielle.'
  },
  {
    date: '2022',
    title: 'Baccalauréat Scientifique',
    institution: 'Lycée...',
    description: 'Option Sciences de l\'Ingénieur.'
  }
];

export const experiences = [
  {
    date: 'Sept 2024 - Jan 2025',
    title: 'Employé Polyvalent',
    institution: 'Five Guys',
    description: 'Développement de compétences en travail d\'équipe, gestion du temps et service client dans un environnement rapide.'
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
  },
  {
    id: 'chatbot-voiceflow',
    title: 'Chatbot IA Voiceflow',
    description: 'Assistant éducatif et commercial avec intégration API, Google Sheets, et Make.com.',
    technologies: ['Voiceflow', 'API', 'Google Sheets', 'Make.com'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    github: 'https://github.com/eulogep/ai-chatbot-voiceflow',
    demo: 'https://voiceflow-chatbot-demo.vercel.app/',
    status: 'en cours',
  },
  {
    id: 'beewise-dashboard',
    title: 'BeeWise – Dashboard IoT Apiculture',
    description: 'Collecte de données API, Redis, Bot Discord, et visualisation Python.',
    technologies: ['Python', 'Redis', 'Discord Bot', 'IoT'],
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&h=600&fit=crop',
    github: 'https://gitlab.com/mabialaeulogejunior-group/beewise-dashboard',
    demo: 'https://beewise-demo.vercel.app/',
    status: 'élaboration',
  },
  {
    id: 'hip-hop-master',
    title: 'Hip-Hop Master – Formation Danse',
    description: 'Site web de formation en danse hip-hop avec système de réservation et gestion des cours.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    image: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=800&h=600&fit=crop',
    github: 'https://github.com/eulogep/hip-hop-master',
    demo: 'https://hip-hop-master.vercel.app/',
    status: 'fini',
  },
  {
    id: 'mentorbot-evolution',
    title: 'MentorBot Evolution',
    description: 'Assistant IA avancé pour le mentorat et l\'accompagnement personnalisé.',
    technologies: ['Python', 'OpenAI', 'FastAPI', 'React'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    github: 'https://github.com/eulogep/mentorbot-evolution',
    demo: 'https://mentorbot-evolution.vercel.app/',
    status: 'en cours',
  },
  {
    id: 'afrique-developpement',
    title: 'Afrique Développement',
    description: 'Plateforme de développement et d\'innovation pour l\'Afrique.',
    technologies: ['React', 'Node.js', 'MongoDB', 'AWS'],
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
    github: 'https://github.com/eulogep/afrique-developpement',
    demo: 'https://afrique-developpement.vercel.app/',
    status: 'élaboration',
  },
  {
    id: 'afrique-projet',
    title: 'Afrique Projet',
    description: 'Gestionnaire de projets pour les initiatives africaines.',
    technologies: ['Vue.js', 'Laravel', 'MySQL', 'Docker'],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    github: 'https://github.com/eulogep/afrique-projet',
    demo: 'https://afrique-projet.vercel.app/',
    status: 'prévu',
  },
  {
    id: 'integration-platforme',
    title: 'Plateforme d\'Aide à l\'Intégration',
    description: 'Plateforme d\'aide à l\'intégration des Africains en Europe.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
    github: 'https://github.com/eulogep/integration-platforme',
    demo: 'https://integration-platforme.vercel.app/',
    status: 'en cours',
  },
  {
    id: 'diasporalink',
    title: 'DiasporaLink',
    description: 'Réseau social pour la diaspora africaine.',
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'Vercel'],
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
    github: 'https://github.com/eulogep/diasporalink',
    demo: 'https://diasporalink.vercel.app/',
    status: 'élaboration',
  },
  {
    id: 'simulateur-brute-force',
    title: 'Simulateur Brute Force',
    description: 'Outil éducatif pour comprendre les attaques par force brute.',
    technologies: ['Python', 'Flask', 'JavaScript', 'Bootstrap'],
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=600&fit=crop',
    github: 'https://github.com/eulogep/simulateur-brute-force',
    demo: 'https://simulateur-brute-force.vercel.app/',
    status: 'fini',
  },
  {
    id: 'classeur-numerique',
    title: 'Classeur Numérique Intelligent',
    description: 'Système de gestion documentaire intelligent avec IA.',
    technologies: ['React', 'Python', 'TensorFlow', 'MongoDB'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    github: 'https://github.com/eulogep/classeur-numerique-intelligent',
    demo: 'https://classeur-numerique.vercel.app/',
    status: 'en cours',
  },
  {
    id: 'bruteforce-app',
    title: 'BruteForce Application v1',
    description: 'Application de test de sécurité pour les mots de passe.',
    technologies: ['Python', 'Tkinter', 'SQLite', 'Cryptography'],
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
    github: 'https://github.com/eulogep/bruteforce-application-v1',
    demo: 'https://bruteforce-app.vercel.app/',
    status: 'fini',
  },
  {
    id: 'dex-swap-app',
    title: 'DEX Swap Application',
    description: 'Application de trading décentralisé avec interface moderne.',
    technologies: ['React', 'Web3.js', 'Solidity', 'Ethereum'],
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop',
    github: 'https://github.com/eulogep/dex-swap-app',
    demo: 'https://dex-swap-app.vercel.app/',
    status: 'élaboration',
  }
];

export const certifications = [
  'Certification Google Cybersécurité (en cours)',
  'Certifications HTML/CSS/JS – FreeCodeCamp / OpenClassrooms'
];