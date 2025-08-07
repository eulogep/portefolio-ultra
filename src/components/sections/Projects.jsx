
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Target, CheckCircle, Clock, Play, Filter, Code2, Rocket, Layers, BookOpen } from 'lucide-react';
import { projects } from '@/data/portfolioData';

const statusIcons = {
  'fini': CheckCircle,
  'en cours': Clock,
  'élaboration': Rocket,
  'prévu': Play
};

const statusLabels = {
  'fini': 'Terminé',
  'en cours': 'En cours',
  'élaboration': 'En élaboration',
  'prévu': 'À venir'
};

const statusColors = {
  'fini': 'from-green-500 to-green-600',
  'en cours': 'from-blue-500 to-blue-600',
  'élaboration': 'from-purple-500 to-purple-600',
  'prévu': 'from-amber-500 to-amber-600'
};

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.status === filter);
  const allStatuses = Array.from(new Set(projects.map(p => p.status)));

  // Animations cohérentes avec le Hero
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-5, 5, -5],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section id="projects" className="section-padding relative section-bg-harmonized overflow-hidden">
      {/* Fond décoratif SVG premium avec animation */}
      <motion.svg 
        className="absolute left-0 top-0 w-full h-full pointer-events-none opacity-20 z-0" 
        aria-hidden="true"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      >
        <defs>
          <radialGradient id="projects-grad" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="60%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <motion.ellipse 
          cx="20%" cy="30%" rx="250" ry="150" fill="url(#projects-grad)"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.ellipse 
          cx="80%" cy="70%" rx="200" ry="120" fill="url(#projects-grad)"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
        />
      </motion.svg>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h2 className="font-bold text-4xl lg:text-6xl gradient-text-premium mb-6">
              Mes Projets
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Découvrez mes réalisations et projets en cours de développement
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full font-semibold glass-effect border-white/20 transition-all ${filter === 'all' ? 'bg-purple-600 text-white' : 'hover:bg-white/10 text-gray-300'}`}
            >
              <Target className="w-4 h-4 mr-2 inline" /> Toutes
            </motion.button>
            {allStatuses.map((status, index) => (
              <motion.button
                key={status}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-full font-semibold glass-effect border-white/20 transition-all ${filter === status ? 'bg-purple-600 text-white' : 'hover:bg-white/10 text-gray-300'}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {React.createElement(statusIcons[status] || BookOpen, { className: 'w-4 h-4 mr-2 inline' })}
                {statusLabels[status] || status}
              </motion.button>
            ))}
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
            variants={containerVariants}
          >
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, index) => {
                const StatusIcon = statusIcons[project.status] || BookOpen;
                const statusColor = statusColors[project.status] || 'from-gray-500 to-gray-600';
                return (
                  <motion.div
                    key={project.title}
                    layout
                    variants={itemVariants}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -50, scale: 0.9 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ 
                      y: -8, 
                      scale: 1.02,
                      boxShadow: "0 20px 40px rgba(251,191,36,0.2)",
                      transition: { duration: 0.3 }
                    }}
                    className="quest-card glass-effect rounded-2xl p-6 relative overflow-hidden group cursor-pointer"
                  >
                    <div className="absolute inset-0 opacity-20">
                      <img alt={project.title} className="w-full h-full object-cover" src={typeof project.image === 'string' ? `/src/assets/${project.image}` : ''} />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <motion.div 
                            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${statusColor} flex items-center justify-center`}
                            whileHover={{ scale: 1.1, rotate: 10 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <Code2 className="w-6 h-6 text-white" />
                          </motion.div>
                          <div>
                            <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                            <div className="flex items-center gap-2">
                              <StatusIcon className="w-4 h-4 text-gray-300" />
                              <span className="text-sm text-gray-300">{statusLabels[project.status] || project.status}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 mb-4 line-clamp-3">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.slice(0, 3).map((tech, techIndex) => (
                          <motion.span
                            key={tech}
                            className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: techIndex * 0.1 }}
                            viewport={{ once: true }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                        {project.tech.length > 3 && (
                          <span className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300">
                            +{project.tech.length - 3}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        {project.githubLink && (
                          <motion.a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            GitHub
                          </motion.a>
                        )}
                        {project.demoLink && (
                          <motion.a
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-center py-2 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Demo
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      {/* Styles premium améliorés */}
      <style>{`
        .glass-effect {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.2);
          transition: all 0.3s ease;
        }
        .gradient-text-premium {
          background: linear-gradient(90deg, #60a5fa 0%, #fbbf24 50%, #f472b6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .quest-card {
          transition: all 0.3s ease;
        }
        .quest-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(251,191,36,0.2);
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default Projects;