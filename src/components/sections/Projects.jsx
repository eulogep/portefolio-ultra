/**
 * Section "Mes Projets" avec animations unifiées
 * Créé par Euloge Mabiala - Portfolio Ultra
 * Utilise le système d'animations identique au Hero
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Target, CheckCircle, Clock, Play, Filter, Code2, Rocket, Layers, BookOpen, Sparkles } from 'lucide-react';
import { projects } from '@/data/portfolioData';
import AnimatedBackground from '@/components/ui/AnimatedBackground';

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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.status === filter);
  const allStatuses = Array.from(new Set(projects.map(p => p.status)));

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animations identiques au Hero
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
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section 
      id="projects" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden safe-area"
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.1) 25%, rgba(16, 185, 129, 0.05) 50%, transparent 70%)`,
      }}
    >
      <AnimatedBackground particleCount={25}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            <motion.div
              variants={itemVariants}
              className="text-center mb-12 sm:mb-16"
            >
              <motion.h2 
                className="responsive-heading font-black tracking-tight mb-6"
                style={{
                  background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 25%, #34d399 50%, #fbbf24 75%, #f87171 100%)',
                  backgroundSize: '300% 300%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                Mes Projets
              </motion.h2>
              <motion.p 
                className="responsive-text text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
                variants={itemVariants}
              >
                Découvrez mes réalisations en développement web, applications mobiles et projets innovants
              </motion.p>
            </motion.div>

            {/* Filtres */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter('all')}
                className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
                  filter === 'all'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'glass-effect-premium hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                <Filter className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
                Tous
              </motion.button>
              
              {allStatuses.map((status) => {
                const Icon = statusIcons[status];
                return (
                  <motion.button
                    key={status}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilter(status)}
                    className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
                      filter === status
                        ? `bg-gradient-to-r ${statusColors[status]} text-white shadow-lg`
                        : 'glass-effect-premium hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
                    {statusLabels[status]}
                  </motion.button>
                );
              })}
            </motion.div>

            {/* Grille de projets */}
            <motion.div
              variants={containerVariants}
              className="responsive-grid"
            >
              <AnimatePresence mode="wait">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ delay: index * 0.1 }}
                    className="relative group"
                  >
                    <div className="relative overflow-hidden rounded-2xl glass-effect-premium hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                      {/* Image du projet */}
                      <div className="relative h-48 sm:h-56 overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
                        {/* Badge de statut */}
                        <div className="absolute top-4 right-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${statusColors[project.status]} text-white`}>
                            {statusLabels[project.status]}
                          </span>
                        </div>
                      </div>

                      {/* Contenu du projet */}
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {project.title}
                          </h3>
                          <motion.div
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          >
                            <Sparkles className="w-5 h-5 text-yellow-400" />
                          </motion.div>
                        </div>

                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                          {project.description}
                        </p>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.slice(0, 4).map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full">
                              +{project.technologies.length - 4}
                            </span>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2 bg-gray-900 dark:bg-gray-800 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
                          >
                            <Code2 className="w-4 h-4 mr-2" />
                            Code
                          </a>
                          {project.demo && (
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                            >
                              <Play className="w-4 h-4 mr-2" />
                              Demo
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Message si aucun projet trouvé */}
            {filteredProjects.length === 0 && (
              <motion.div
                variants={itemVariants}
                className="text-center py-12"
              >
                <Layers className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  Aucun projet trouvé pour ce filtre
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </AnimatedBackground>
    </section>
  );
};

export default Projects;