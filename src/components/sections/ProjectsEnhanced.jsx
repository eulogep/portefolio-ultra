import React, { useState, useEffect } from 'react';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  ExternalLink, 
  Filter, 
  Search, 
  Calendar,
  Code2,
  Star,
  PlayCircle,
  CheckCircle,
  Clock,
  Lightbulb,
  X,
  Eye,
  Heart,
  TrendingUp,
  Zap,
  Grid3X3,
  List,
  SortAsc,
  SortDesc
} from 'lucide-react';
import { projects } from '@/data/portfolioData';
import { useSmoothReveal } from '@/hooks/useAdvancedScrollEffects';

const getStatusIcon = (status) => {
  switch (status) {
    case 'fini': return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'en cours': return <PlayCircle className="w-4 h-4 text-blue-500" />;
    case 'élaboration': return <Clock className="w-4 h-4 text-yellow-500" />;
    case 'prévu': return <Lightbulb className="w-4 h-4 text-purple-500" />;
    default: return <Code2 className="w-4 h-4 text-gray-500" />;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'fini': return 'from-green-400 to-emerald-500';
    case 'en cours': return 'from-blue-400 to-indigo-500';
    case 'élaboration': return 'from-yellow-400 to-orange-500';
    case 'prévu': return 'from-purple-400 to-violet-500';
    default: return 'from-gray-400 to-gray-500';
  }
};

const ProjectPreview = ({ project, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="glass-premium rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 mb-2">
              {getStatusIcon(project.status)}
              <span className="text-white text-sm font-medium capitalize">
                {project.status}
              </span>
              <span className="text-white/70 text-sm">• {project.year}</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
            <p className="text-white/80 text-sm">{project.role}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
          {/* Description */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-3">Aperçu du projet</h4>
            <p className="text-foreground-secondary leading-relaxed">{project.pitch}</p>
          </div>

          {/* Technologies */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-3">Technologies utilisées</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-glass-bg border border-glass-border rounded-full text-sm font-medium text-foreground-secondary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Highlights */}
          {project.highlights && (
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-3">Points forts</h4>
              <ul className="space-y-2">
                {project.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground-secondary text-sm">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Impact Metrics */}
          {project.impact && (
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-3">Impact & Métriques</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {Object.entries(project.impact).map(([key, value]) => (
                  <div key={key} className="text-center p-3 bg-glass-bg rounded-lg border border-glass-border">
                    <div className="text-lg font-bold text-primary-500">{value}</div>
                    <div className="text-sm text-foreground-secondary capitalize">{key}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            {project.demo && (
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary flex-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Eye className="w-4 h-4" />
                <span>Voir la démo</span>
              </motion.a>
            )}
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary flex-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Github className="w-4 h-4" />
                <span>Code source</span>
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectCard = ({ project, index, isVisible, onPreview }) => {
  const [isLiked, setIsLiked] = useState(false);
  
  return (
    <motion.div
      className="card group relative overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={() => onPreview(project)}
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Status Badge */}
        <div className={`absolute top-3 left-3 px-2 py-1 rounded-full bg-gradient-to-r ${getStatusColor(project.status)} text-white text-xs font-medium flex items-center gap-1`}>
          {getStatusIcon(project.status)}
          <span className="capitalize">{project.status}</span>
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
            <Star className="w-4 h-4 text-white" />
          </div>
        )}

        {/* Hover Actions */}
        <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className={`w-8 h-8 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center transition-colors ${
              isLiked ? 'bg-red-500 text-white' : 'bg-black/50 text-white hover:bg-black/70'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </motion.button>
          
          {project.demo && (
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary-500 transition-colors line-clamp-2">
            {project.title}
          </h3>
          <span className="text-sm text-foreground-tertiary">{project.year}</span>
        </div>
        
        <p className="text-foreground-secondary text-sm line-clamp-3 leading-relaxed">
          {project.pitch}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1">
          {project.technologies.slice(0, 3).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-glass-bg border border-glass-border rounded text-xs font-medium text-foreground-secondary"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-1 bg-glass-bg border border-glass-border rounded text-xs font-medium text-foreground-tertiary">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3">
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-foreground-tertiary hover:text-foreground transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github className="w-4 h-4" />
              </motion.a>
            )}
            <span className="text-foreground-secondary text-sm">{project.category}</span>
          </div>
          
          <motion.button
            className="text-primary-500 text-sm font-medium hover:text-primary-600 transition-colors"
            whileHover={{ x: 4 }}
          >
            Voir plus →
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsEnhanced = () => {
  const [ref, isVisible] = useSmoothReveal(0.1);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('year');
  const [sortOrder, setSortOrder] = useState('desc');

  const categories = ['all', ...new Set(projects.map(p => p.category))];
  const statuses = ['all', ...new Set(projects.map(p => p.status))];

  useEffect(() => {
    let filtered = projects;

    // Filter by category
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(project => 
        project.category === selectedFilter || project.status === selectedFilter
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some(tech => 
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        project.pitch.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort projects
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'year') {
        aValue = parseInt(aValue);
        bValue = parseInt(bValue);
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredProjects(filtered);
  }, [selectedFilter, searchQuery, sortBy, sortOrder]);

  return (
    <section id="projects" className="section relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-shape absolute"
            style={{
              background: `var(--gradient-${['primary', 'secondary', 'tertiary'][i % 3]})`,
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              borderRadius: i % 2 ? '50%' : 'var(--radius-lg)',
            }}
            animate={{
              x: [0, Math.random() * 20 - 10],
              y: [0, Math.random() * 20 - 10],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: Math.random() * 8 + 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div ref={ref} className="container relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold gradient-text mb-6 text-balance">
            Mes Projets
          </h2>
          <p className="text-lg sm:text-xl text-foreground-secondary max-w-3xl mx-auto text-pretty">
            Une sélection de mes réalisations techniques et créatives
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          className="glass-premium p-6 rounded-2xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground-tertiary" />
              <input
                type="text"
                placeholder="Rechercher un projet ou une technologie..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-glass-bg border border-glass-border rounded-lg text-foreground placeholder-foreground-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {[...categories, ...statuses.slice(1)].map((filter) => (
                <motion.button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                    selectedFilter === filter
                      ? 'bg-primary-500 text-white'
                      : 'bg-glass-bg border border-glass-border text-foreground-secondary hover:text-foreground hover:border-primary-400'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {filter === 'all' ? 'Tous' : filter}
                </motion.button>
              ))}
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="btn btn-ghost p-2"
              >
                {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid3X3 className="w-4 h-4" />}
              </button>
              
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="btn btn-ghost p-2"
              >
                {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Results Info */}
          <div className="mt-4 flex items-center justify-between text-sm text-foreground-secondary">
            <span>
              {filteredProjects.length} projet{filteredProjects.length !== 1 ? 's' : ''} trouvé{filteredProjects.length !== 1 ? 's' : ''}
            </span>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>Triés par {sortBy === 'year' ? 'année' : 'nom'}</span>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className={`grid gap-8 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isVisible={isVisible}
                onPreview={setSelectedProject}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 rounded-full bg-glass-bg border border-glass-border flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-foreground-tertiary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Aucun projet trouvé</h3>
            <p className="text-foreground-secondary">
              Essayez de modifier vos critères de recherche ou vos filtres
            </p>
          </motion.div>
        )}
      </div>

      {/* Project Preview Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectPreview
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsEnhanced;
