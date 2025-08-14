import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Code2, 
  ExternalLink, 
  Github,
  Zap,
  Shield,
  Cpu,
  Globe,
  Filter,
  Search,
  Maximize2
} from 'lucide-react';
import LiveDemoPlayer from '@/components/ui/LiveDemoPlayer';
import { projects } from '@/data/portfolioData';

const ProjectDemoShowcase = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter projects that have demos
  const projectsWithDemos = projects.filter(project => 
    project.demo && 
    project.demo !== '#' && 
    !project.demo.includes('vercel.app') // Filter out placeholder demos
  );

  const featuredProjects = projectsWithDemos.filter(project => project.featured);

  const categories = [
    { id: 'all', label: 'Tous les projets', count: projectsWithDemos.length },
    { id: 'web', label: 'Web Apps', count: projectsWithDemos.filter(p => p.category === 'Web Development').length },
    { id: 'ai', label: 'IA & Chatbots', count: projectsWithDemos.filter(p => p.category === 'AI/ML').length },
    { id: 'tools', label: 'Outils', count: projectsWithDemos.filter(p => p.category === 'Cybersecurity').length }
  ];

  const filteredProjects = projectsWithDemos.filter(project => {
    const matchesFilter = filter === 'all' || 
      (filter === 'web' && project.category === 'Web Development') ||
      (filter === 'ai' && project.category === 'AI/ML') ||
      (filter === 'tools' && project.category === 'Cybersecurity');
    
    const matchesSearch = !searchQuery || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

  const openDemoModal = (project) => {
    setSelectedProject(project);
  };

  const closeDemoModal = () => {
    setSelectedProject(null);
  };

  const ProjectCard = ({ project, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300"
    >
      {/* Project Preview */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.button
            onClick={() => openDemoModal(project)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-500/90 hover:bg-blue-500 backdrop-blur-sm rounded-lg text-white font-medium transition-all shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="w-5 h-5" />
            Voir la démo
          </motion.button>
        </div>
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
            project.status === 'fini' 
              ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
            project.status === 'en cours'
              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
              'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
          }`}>
            <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
            {project.status}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <motion.a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-blue-500/90 hover:bg-blue-500 backdrop-blur-sm rounded-lg text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Ouvrir la démo"
          >
            <ExternalLink className="w-4 h-4" />
          </motion.a>
          
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-700/90 hover:bg-gray-700 backdrop-blur-sm rounded-lg text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Voir le code"
            >
              <Github className="w-4 h-4" />
            </motion.a>
          )}
        </div>
      </div>

      {/* Project Info */}
      <div className="p-6">
        <h3 className="font-bold text-lg text-foreground group-hover:text-white transition-colors mb-2">
          {project.title}
        </h3>
        
        <p className="text-sm text-foreground/70 line-clamp-2 mb-4">
          {project.pitch || project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1 mb-4">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-md border border-blue-500/30"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-1 bg-gray-500/20 text-gray-400 text-xs rounded-md">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Metrics */}
        {project.impact && (
          <div className="flex items-center gap-4 text-xs text-foreground/60">
            {Object.entries(project.impact).slice(0, 2).map(([key, value]) => (
              <div key={key} className="flex items-center gap-1">
                <Zap className="w-3 h-3" />
                <span>{value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );

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
            <Play className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium text-foreground/80">Démos Interactives</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Projets en Action
            </span>
            <br />
            <span className="text-foreground">Démos Live</span>
          </h2>
          
          <p className="text-lg text-foreground/60 max-w-3xl mx-auto leading-relaxed">
            Testez mes applications directement dans votre navigateur. 
            Chaque démo est sécurisée et optimisée pour une expérience fluide.
          </p>
        </motion.div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40" />
            <input
              type="text"
              placeholder="Rechercher par nom ou technologie..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-foreground placeholder-foreground/40 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  filter === category.id
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-white/5 text-foreground/70 hover:bg-white/10 hover:text-foreground border border-white/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {category.label} ({category.count})
              </motion.button>
            ))}
          </div>
        </div>

        {/* Featured Demo Preview */}
        {featuredProjects.length > 0 && filter === 'all' && !searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
              🌟 Démo en Vedette
            </h3>
            
            <div className="max-w-4xl mx-auto">
              <LiveDemoPlayer 
                project={featuredProjects[0]} 
                showControls={true}
                defaultView="desktop"
              />
            </div>
          </motion.div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Aucune démo trouvée</h3>
            <p className="text-foreground/60">
              Essayez de modifier vos critères de recherche ou filtres.
            </p>
          </motion.div>
        )}

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-green-500/10 border border-green-500/20 rounded-2xl p-6"
        >
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-green-400 mb-2">Démos Sécurisées</h4>
              <p className="text-sm text-foreground/70 leading-relaxed">
                Toutes les démos sont exécutées dans des environnements sandbox sécurisés. 
                Vos données restent privées et aucune information personnelle n'est collectée.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-3 text-xs text-foreground/60">
                <div className="flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  <span>Sandbox isolé</span>
                </div>
                <div className="flex items-center gap-1">
                  <Cpu className="w-3 h-3" />
                  <span>Performance optimisée</span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  <span>Compatible tous navigateurs</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Demo Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={closeDemoModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-6xl w-full max-h-[90vh] overflow-auto bg-gray-900/95 backdrop-blur-xl rounded-3xl border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">
                    {selectedProject.title} - Démo Live
                  </h3>
                  <button
                    onClick={closeDemoModal}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    ✕
                  </button>
                </div>
                
                <LiveDemoPlayer 
                  project={selectedProject} 
                  showControls={true}
                  defaultView="desktop"
                  autoPlay={true}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectDemoShowcase;
