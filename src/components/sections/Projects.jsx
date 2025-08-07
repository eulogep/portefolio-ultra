
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.1) 25%, rgba(16, 185, 129, 0.05) 50%, transparent 70%)`,
      }}
    >
      <AnimatedBackground particleCount={25}>
        <div className="container mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            <motion.div
              variants={itemVariants}
              className="text-center mb-16"
            >
              <motion.h2 
                className="text-6xl md:text-8xl font-black tracking-tight"
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
                className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed"
                variants={itemVariants}
              >
                Découvrez mes réalisations et projets en cours de développement
              </motion.p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-full font-semibold bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-gray-500 transition-all ${filter === 'all' ? 'bg-purple-600 text-white' : 'hover:bg-white/10 text-gray-300'}`}
              >
                <Target className="w-4 h-4 mr-2 inline" /> Toutes
              </motion.button>
              {allStatuses.map((status, index) => (
                <motion.button
                  key={status}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-full font-semibold bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-gray-500 transition-all ${filter === status ? 'bg-purple-600 text-white' : 'hover:bg-white/10 text-gray-300'}`}
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
                        scale: 1.05, 
                        y: -8,
                        transition: { duration: 0.3 }
                      }}
                      className="group relative p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl hover:border-gray-500 transition-all duration-300 cursor-pointer overflow-hidden"
                    >
                      <motion.div
                        className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="w-4 h-4 text-white" />
                      </motion.div>

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
      </AnimatedBackground>
    </section>
  );
};

export default Projects;