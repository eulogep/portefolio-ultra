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
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { projects } from '@/data/portfolioData';

const ProjectsEnhanced = () => {
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const statusFilters = [
    { id: 'all', label: 'Tous les projets', count: projects.length },
    { id: 'fini', label: 'Terminés', count: projects.filter(p => p.status === 'fini').length },
    { id: 'en cours', label: 'En cours', count: projects.filter(p => p.status === 'en cours').length },
    { id: 'élaboration', label: 'En développement', count: projects.filter(p => p.status === 'élaboration').length },
    { id: 'prévu', label: 'Prévus', count: projects.filter(p => p.status === 'prévu').length },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'fini': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'en cours': return <PlayCircle className="w-4 h-4 text-blue-500" />;
      case 'élaboration': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'prévu': return <Lightbulb className="w-4 h-4 text-purple-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'fini': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'en cours': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'élaboration': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'prévu': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  useEffect(() => {
    let filtered = projects;

    // Filter by status
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(project => project.status === selectedFilter);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some(tech => 
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    setFilteredProjects(filtered);
  }, [selectedFilter, searchQuery]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const ProjectCard = ({ project, index }) => (
    <motion.div
      variants={itemVariants}
      layout
      className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300"
      whileHover={{ scale: 1.02, y: -5 }}
      onClick={() => setSelectedProject(project)}
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
            {getStatusIcon(project.status)}
            {project.status}
          </div>
        </div>

        {/* Technologies Preview */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex flex-wrap gap-1">
            {project.technologies.slice(0, 3).map((tech, techIndex) => (
              <span
                key={techIndex}
                className="px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-xs rounded-md"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-xs rounded-md">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-foreground group-hover:text-white transition-colors">
            {project.title}
          </h3>
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-4 h-4" />
              </motion.a>
            )}
            {project.demo && (
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            )}
          </div>
        </div>

        <p className="text-foreground/60 text-sm line-clamp-3 mb-4 leading-relaxed">
          {project.description.split('\n')[0]}
        </p>

        {/* Project Stats */}
        <div className="flex items-center justify-between text-xs text-foreground/50">
          <div className="flex items-center gap-2">
            <Code2 className="w-3 h-3" />
            <span>{project.technologies.length} technologies</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-400" />
            <span>Projet {project.status}</span>
          </div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(96, 165, 250, 0.1) 0%, transparent 70%)',
          filter: 'blur(20px)'
        }}
      />
    </motion.div>
  );

  const ProjectModal = ({ project, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="relative max-w-4xl w-full max-h-[90vh] overflow-auto bg-gray-900/95 backdrop-blur-xl rounded-3xl border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Project Image */}
        <div className="relative h-64 md:h-80 overflow-hidden rounded-t-3xl">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-transparent to-transparent" />
        </div>

        {/* Project Content */}
        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(project.status)}`}>
                {getStatusIcon(project.status)}
                {project.status}
              </div>
            </div>
            <div className="flex items-center gap-3">
              {project.github && (
                <Button
                  asChild
                  variant="outline"
                  className="bg-white/10 border-white/20 hover:bg-white/20"
                >
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    Code Source
                  </a>
                </Button>
              )}
              {project.demo && (
                <Button
                  asChild
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Voir la Démo
                  </a>
                </Button>
              )}
            </div>
          </div>

          <div className="prose prose-invert max-w-none mb-8">
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </div>

          {/* Technologies */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">Technologies utilisées</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg text-sm text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <section 
      ref={ref}
      id="projects" 
      className="py-20 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full mb-6 border border-white/20"
          >
            <Code2 className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium text-foreground/80">Portfolio & Réalisations</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Mes Projets
            </span>
            <br />
            <span className="text-foreground">& Créations</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg text-foreground/60 max-w-3xl mx-auto leading-relaxed"
          >
            Découvrez une sélection de mes projets les plus représentatifs, 
            allant du développement web à l'intelligence artificielle.
          </motion.p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col lg:flex-row gap-6 mb-12"
        >
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40" />
            <input
              type="text"
              placeholder="Rechercher un projet..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-foreground placeholder-foreground/40 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {statusFilters.map((filter) => (
              <motion.button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedFilter === filter.id
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-white/5 text-foreground/70 hover:bg-white/10 hover:text-foreground border border-white/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {filter.label} ({filter.count})
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results Message */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Aucun projet trouvé</h3>
            <p className="text-foreground/60">
              Essayez de modifier vos critères de recherche ou filtres.
            </p>
          </motion.div>
        )}

        {/* Project Summary Stats */}
        <motion.div
          variants={itemVariants}
          className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {[
            { label: "Projets Totaux", value: projects.length, color: "from-blue-500 to-cyan-500" },
            { label: "Projets Terminés", value: projects.filter(p => p.status === 'fini').length, color: "from-green-500 to-emerald-500" },
            { label: "En Développement", value: projects.filter(p => p.status === 'en cours').length, color: "from-yellow-500 to-orange-500" },
            { label: "Technologies", value: [...new Set(projects.flatMap(p => p.technologies))].length, color: "from-purple-500 to-pink-500" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className={`text-center p-6 rounded-2xl bg-gradient-to-br ${stat.color} bg-opacity-10 border border-white/10 backdrop-blur-sm`}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-foreground/60 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsEnhanced;
