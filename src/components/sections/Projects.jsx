
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

  return (
    <section id="projects" className="section-padding relative section-bg-harmonized overflow-hidden">
      <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
              viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full font-semibold glass-effect border-white/20 transition-all ${filter === 'all' ? 'bg-purple-600 text-white' : 'hover:bg-white/10 text-gray-300'}`}
          >
            <Target className="w-4 h-4 mr-2 inline" /> Toutes
          </button>
          {allStatuses.map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-full font-semibold glass-effect border-white/20 transition-all ${filter === status ? 'bg-purple-600 text-white' : 'hover:bg-white/10 text-gray-300'}`}
            >
              {React.createElement(statusIcons[status] || BookOpen, { className: 'w-4 h-4 mr-2 inline' })}
              {statusLabels[status] || status}
            </button>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => {
              const StatusIcon = statusIcons[project.status] || BookOpen;
              const statusColor = statusColors[project.status] || 'from-gray-500 to-gray-600';
              return (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -50, scale: 0.9 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="quest-card glass-effect rounded-2xl p-6 relative overflow-hidden group cursor-pointer"
                >
                  <div className="absolute inset-0 opacity-20">
                    <img alt={project.title} className="w-full h-full object-cover" src={typeof project.image === 'string' ? `/src/assets/${project.image}` : ''} />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${statusColor} flex items-center justify-center`}>
                          <Code2 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${statusColor} text-white mb-1`}>
                            {statusLabels[project.status] || project.status}
                          </div>
                          <p className="text-sm text-gray-400">{project.tech?.join(', ')}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusIcon className={`w-5 h-5 ${project.status === 'fini' ? 'text-green-400' : 'text-gray-400'}`} />
                      </div>
                    </div>
                    <h3 className="font-orbitron font-bold text-xl mb-3 group-hover:text-purple-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.pptLink && (
                        <a href={project.pptLink} className="px-2 py-1 bg-amber-500/20 text-amber-300 rounded-lg text-xs font-medium flex items-center gap-1" target="_blank" rel="noopener noreferrer">
                          <Award className="w-3 h-3"/> Présentation
                        </a>
                      )}
                      {project.demoLink && (
                        <a href={project.demoLink} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-xs font-medium flex items-center gap-1" target="_blank" rel="noopener noreferrer">
                          <Rocket className="w-3 h-3"/> Démo
                        </a>
                      )}
                      {project.githubLink && (
                        <a href={project.githubLink} className="px-2 py-1 bg-gray-700/20 text-gray-200 rounded-lg text-xs font-medium flex items-center gap-1" target="_blank" rel="noopener noreferrer">
                          <Layers className="w-3 h-3"/> Code
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-400">Aucun projet trouvé pour ce filtre</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;