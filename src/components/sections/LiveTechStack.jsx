import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  Database, 
  Globe, 
  Server, 
  Smartphone,
  Shield,
  Zap,
  Cpu,
  Cloud,
  GitBranch,
  Activity,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Clock,
  TrendingUp
} from 'lucide-react';

const LiveTechStack = () => {
  const [selectedCategory, setSelectedCategory] = useState('frontend');
  const [liveData, setLiveData] = useState({});
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Tech stack with real-time status
  const techStack = {
    frontend: {
      label: 'Frontend',
      icon: Globe,
      color: 'from-blue-500 to-cyan-500',
      technologies: [
        {
          name: 'React',
          version: '18.2.0',
          logo: '⚛️',
          status: 'active',
          usage: 95,
          projects: 8,
          description: 'Bibliothèque principale pour l\'interface utilisateur',
          links: {
            docs: 'https://react.dev',
            github: 'https://github.com/facebook/react'
          },
          badges: [
            { type: 'version', url: 'https://img.shields.io/npm/v/react' },
            { type: 'downloads', url: 'https://img.shields.io/npm/dm/react' }
          ]
        },
        {
          name: 'Vue.js',
          version: '3.3.4',
          logo: '🟢',
          status: 'active',
          usage: 82,
          projects: 4,
          description: 'Framework progressif pour des interfaces utilisateur',
          links: {
            docs: 'https://vuejs.org',
            github: 'https://github.com/vuejs/core'
          },
          badges: [
            { type: 'version', url: 'https://img.shields.io/npm/v/vue' },
            { type: 'bundle', url: 'https://img.shields.io/bundlephobia/minzip/vue' }
          ]
        },
        {
          name: 'Tailwind CSS',
          version: '3.3.3',
          logo: '🎨',
          status: 'active',
          usage: 98,
          projects: 12,
          description: 'Framework CSS utilitaire pour un développement rapide',
          links: {
            docs: 'https://tailwindcss.com',
            github: 'https://github.com/tailwindlabs/tailwindcss'
          },
          badges: [
            { type: 'version', url: 'https://img.shields.io/npm/v/tailwindcss' },
            { type: 'stars', url: 'https://img.shields.io/github/stars/tailwindlabs/tailwindcss' }
          ]
        },
        {
          name: 'Framer Motion',
          version: '10.16.4',
          logo: '🎭',
          status: 'active',
          usage: 88,
          projects: 6,
          description: 'Bibliothèque d\'animations pour React',
          links: {
            docs: 'https://www.framer.com/motion',
            github: 'https://github.com/framer/motion'
          },
          badges: [
            { type: 'version', url: 'https://img.shields.io/npm/v/framer-motion' }
          ]
        }
      ]
    },
    backend: {
      label: 'Backend',
      icon: Server,
      color: 'from-green-500 to-emerald-500',
      technologies: [
        {
          name: 'Python',
          version: '3.11',
          logo: '🐍',
          status: 'active',
          usage: 90,
          projects: 6,
          description: 'Langage polyvalent pour le développement backend et IA',
          links: {
            docs: 'https://python.org',
            github: 'https://github.com/python/cpython'
          },
          badges: [
            { type: 'version', url: 'https://img.shields.io/badge/Python-3.11-blue' },
            { type: 'pypi', url: 'https://img.shields.io/pypi/v/python' }
          ]
        },
        {
          name: 'FastAPI',
          version: '0.104.1',
          logo: '⚡',
          status: 'active',
          usage: 85,
          projects: 4,
          description: 'Framework web moderne et rapide pour construire des APIs',
          links: {
            docs: 'https://fastapi.tiangolo.com',
            github: 'https://github.com/tiangolo/fastapi'
          },
          badges: [
            { type: 'version', url: 'https://img.shields.io/pypi/v/fastapi' }
          ]
        },
        {
          name: 'Node.js',
          version: '18.17.0',
          logo: '🟢',
          status: 'active',
          usage: 78,
          projects: 5,
          description: 'Runtime JavaScript côté serveur',
          links: {
            docs: 'https://nodejs.org',
            github: 'https://github.com/nodejs/node'
          },
          badges: [
            { type: 'version', url: 'https://img.shields.io/node/v/node' }
          ]
        }
      ]
    },
    database: {
      label: 'Bases de Données',
      icon: Database,
      color: 'from-purple-500 to-pink-500',
      technologies: [
        {
          name: 'MongoDB',
          version: '7.0',
          logo: '🍃',
          status: 'active',
          usage: 80,
          projects: 4,
          description: 'Base de données NoSQL orientée documents',
          links: {
            docs: 'https://mongodb.com',
            github: 'https://github.com/mongodb/mongo'
          },
          badges: [
            { type: 'version', url: 'https://img.shields.io/badge/MongoDB-7.0-green' }
          ]
        },
        {
          name: 'PostgreSQL',
          version: '15.4',
          logo: '🐘',
          status: 'learning',
          usage: 60,
          projects: 2,
          description: 'Base de données relationnelle avancée',
          links: {
            docs: 'https://postgresql.org',
            github: 'https://github.com/postgres/postgres'
          },
          badges: [
            { type: 'version', url: 'https://img.shields.io/badge/PostgreSQL-15.4-blue' }
          ]
        },
        {
          name: 'Redis',
          version: '7.2',
          logo: '🔴',
          status: 'active',
          usage: 70,
          projects: 3,
          description: 'Store de structures de données en mémoire',
          links: {
            docs: 'https://redis.io',
            github: 'https://github.com/redis/redis'
          },
          badges: [
            { type: 'version', url: 'https://img.shields.io/badge/Redis-7.2-red' }
          ]
        }
      ]
    },
    tools: {
      label: 'Outils & DevOps',
      icon: Zap,
      color: 'from-orange-500 to-red-500',
      technologies: [
        {
          name: 'Git',
          version: '2.42.0',
          logo: '📝',
          status: 'active',
          usage: 100,
          projects: 15,
          description: 'Système de contrôle de version distribué',
          links: {
            docs: 'https://git-scm.com',
            github: 'https://github.com/git/git'
          },
          badges: [
            { type: 'version', url: 'https://img.shields.io/badge/Git-2.42.0-orange' }
          ]
        },
        {
          name: 'Docker',
          version: '24.0.6',
          logo: '🐳',
          status: 'learning',
          usage: 45,
          projects: 2,
          description: 'Plateforme de conteneurisation',
          links: {
            docs: 'https://docker.com',
            github: 'https://github.com/docker/docker-ce'
          },
          badges: [
            { type: 'version', url: 'https://img.shields.io/badge/Docker-24.0.6-blue' }
          ]
        },
        {
          name: 'Vercel',
          version: 'latest',
          logo: '▲',
          status: 'active',
          usage: 95,
          projects: 8,
          description: 'Plateforme de déploiement pour applications web',
          links: {
            docs: 'https://vercel.com',
            github: 'https://github.com/vercel/vercel'
          },
          badges: [
            { type: 'status', url: 'https://img.shields.io/badge/Vercel-Active-black' }
          ]
        },
        {
          name: 'Cypress',
          version: '13.6.0',
          logo: '🧪',
          status: 'active',
          usage: 82,
          projects: 4,
          description: 'Framework de tests end-to-end',
          links: {
            docs: 'https://cypress.io',
            github: 'https://github.com/cypress-io/cypress'
          },
          badges: [
            { type: 'version', url: 'https://img.shields.io/npm/v/cypress' }
          ]
        }
      ]
    },
    ai: {
      label: 'IA & Automation',
      icon: Cpu,
      color: 'from-violet-500 to-purple-500',
      technologies: [
        {
          name: 'OpenAI API',
          version: '4.0',
          logo: '🤖',
          status: 'active',
          usage: 75,
          projects: 3,
          description: 'API pour l\'intelligence artificielle générative',
          links: {
            docs: 'https://platform.openai.com/docs',
            github: 'https://github.com/openai/openai-python'
          },
          badges: [
            { type: 'api', url: 'https://img.shields.io/badge/OpenAI-API-green' }
          ]
        },
        {
          name: 'Voiceflow',
          version: 'latest',
          logo: '🗣️',
          status: 'active',
          usage: 88,
          projects: 2,
          description: 'Plateforme de création de chatbots conversationnels',
          links: {
            docs: 'https://voiceflow.com',
            github: 'https://github.com/voiceflow'
          },
          badges: [
            { type: 'platform', url: 'https://img.shields.io/badge/Voiceflow-Active-purple' }
          ]
        },
        {
          name: 'Make.com',
          version: 'latest',
          logo: '🔗',
          status: 'active',
          usage: 70,
          projects: 3,
          description: 'Plateforme d\'automatisation et d\'intégration',
          links: {
            docs: 'https://make.com',
            github: 'https://github.com/integromat'
          },
          badges: [
            { type: 'integrations', url: 'https://img.shields.io/badge/Make.com-500%2B%20integrations-blue' }
          ]
        }
      ]
    }
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      // Simulate usage fluctuations
      setLiveData(prev => ({
        ...prev,
        [`usage-${Math.random()}`]: Math.random() * 10
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'learning': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'deprecated': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-3 h-3" />;
      case 'learning': return <Clock className="w-3 h-3" />;
      case 'deprecated': return <AlertCircle className="w-3 h-3" />;
      default: return <Activity className="w-3 h-3" />;
    }
  };

  const TechCard = ({ tech, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:bg-white/10 transition-all duration-300"
    >
      {/* Tech Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{tech.logo}</div>
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-white transition-colors">
              {tech.name}
            </h3>
            <div className="text-sm text-foreground/60">v{tech.version}</div>
          </div>
        </div>
        
        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(tech.status)}`}>
          {getStatusIcon(tech.status)}
          {tech.status}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-foreground/70 mb-4 line-clamp-2">
        {tech.description}
      </p>

      {/* Usage Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-foreground/60">Maîtrise</span>
          <span className="text-xs font-medium text-foreground">{tech.usage}%</span>
        </div>
        
        <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${tech.usage}%` }}
            transition={{ duration: 1, delay: index * 0.1 }}
          />
          
          {/* Real-time shimmer effect */}
          <motion.div
            className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: [-32, '100%'] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              delay: index * 0.2,
              repeatDelay: 4
            }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-xs text-foreground/60 mb-4">
        <div className="flex items-center gap-1">
          <GitBranch className="w-3 h-3" />
          <span>{tech.projects} projets</span>
        </div>
        <div className="flex items-center gap-1">
          <TrendingUp className="w-3 h-3" />
          <span>Actif</span>
        </div>
      </div>

      {/* Live Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tech.badges?.map((badge, badgeIndex) => (
          <motion.img
            key={badgeIndex}
            src={badge.url}
            alt={`${tech.name} ${badge.type}`}
            className="h-5 opacity-80 hover:opacity-100 transition-opacity"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.8, scale: 1 }}
            transition={{ delay: (index * 0.1) + (badgeIndex * 0.05) }}
            whileHover={{ scale: 1.05 }}
          />
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {tech.links?.docs && (
          <motion.a
            href={tech.links.docs}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-blue-300 text-xs transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ExternalLink className="w-3 h-3" />
            Docs
          </motion.a>
        )}
        
        {tech.links?.github && (
          <motion.a
            href={tech.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1 bg-gray-700/20 hover:bg-gray-700/30 border border-gray-700/30 rounded-lg text-gray-300 text-xs transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <GitBranch className="w-3 h-3" />
            Code
          </motion.a>
        )}
      </div>
    </motion.div>
  );

  const currentCategory = techStack[selectedCategory];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full mb-6 border border-white/20">
            <Code2 className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium text-foreground/80">Stack Technique Live</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Technologies
            </span>
            <br />
            <span className="text-foreground">En Temps Réel</span>
          </h2>
          
          <div className="flex items-center justify-center gap-4 text-sm text-foreground/60">
            <div className="flex items-center gap-1">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-green-400 rounded-full"
              />
              <span>Live</span>
            </div>
            <span>•</span>
            <span>MAJ: {lastUpdate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-2 overflow-x-auto">
            {Object.entries(techStack).map(([key, category]) => (
              <motion.button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`relative px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === key 
                    ? 'text-white' 
                    : 'text-foreground/70 hover:text-foreground'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {selectedCategory === key && (
                  <motion.div
                    className={`absolute inset-0 rounded-xl bg-gradient-to-r ${category.color}`}
                    layoutId="activeTechTab"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative flex items-center gap-2">
                  <category.icon className="w-5 h-5" />
                  {category.label}
                  <span className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                    {category.technologies.length}
                  </span>
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Tech Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {currentCategory.technologies.map((tech, index) => (
              <TechCard key={tech.name} tech={tech} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {[
            { 
              label: 'Technologies', 
              value: Object.values(techStack).reduce((acc, cat) => acc + cat.technologies.length, 0),
              icon: Code2,
              color: 'from-blue-500 to-cyan-500'
            },
            { 
              label: 'Projets Actifs', 
              value: Object.values(techStack)
                .flatMap(cat => cat.technologies)
                .reduce((acc, tech) => acc + tech.projects, 0),
              icon: GitBranch,
              color: 'from-green-500 to-emerald-500'
            },
            { 
              label: 'Maîtrise Moyenne', 
              value: Math.round(
                Object.values(techStack)
                  .flatMap(cat => cat.technologies)
                  .reduce((acc, tech) => acc + tech.usage, 0) /
                Object.values(techStack).flatMap(cat => cat.technologies).length
              ) + '%',
              icon: TrendingUp,
              color: 'from-purple-500 to-pink-500'
            },
            { 
              label: 'Statut Global', 
              value: 'Actif',
              icon: Activity,
              color: 'from-orange-500 to-red-500'
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`text-center p-6 rounded-2xl bg-gradient-to-br ${stat.color} bg-opacity-10 border border-white/10 backdrop-blur-sm`}
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-foreground/60 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LiveTechStack;
