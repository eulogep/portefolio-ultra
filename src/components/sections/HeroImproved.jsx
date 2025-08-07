/**
 * Section Hero principale avec animations premium
 * Créé par Euloge Mabiala - Portfolio Ultra
 * Système d'animations de référence pour tout le portfolio
 */

import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Github, Linkedin, Mail, Download, ArrowDown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const personalInfo = {
  name: 'Euloge Mabiala',
  title: 'Étudiant Ingénieur Informatique – ESIEA',
  description: 'Passionné par les nouvelles technologies et le développement logiciel, je me spécialise en développement web, cybersécurité et intelligence artificielle.',
  social: {
    github: 'https://github.com/eulogep',
    linkedin: 'https://www.linkedin.com/in/euloge-junior-mabiala',
    email: 'mabiala@et.esiea.fr'
  }
};

const HeroImproved = ({ scrollToSection, handleDownloadCV }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const controls = useAnimation();

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
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

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden safe-area"
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.1) 25%, rgba(16, 185, 129, 0.05) 50%, transparent 70%)`,
      }}
    >
      {/* Particules flottantes animées */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Grille de fond subtile */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
        >
          {/* Image de profil */}
          <motion.div
            variants={itemVariants}
            className="mb-8 flex justify-center"
          >
            <div className="relative">
              <motion.img
                src="/profile.jpg"
                alt="Euloge Mabiala"
                className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full object-cover border-4 border-white/20 shadow-2xl"
                variants={floatingVariants}
                animate="animate"
              />
              <motion.div
                className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
              </motion.div>
            </div>
          </motion.div>

          {/* Nom et titre */}
          <motion.div variants={itemVariants} className="mb-6">
            <h1 className="responsive-heading font-bold text-gray-900 dark:text-white mb-4">
              {personalInfo.name}
            </h1>
            <h2 className="responsive-subheading text-blue-600 dark:text-blue-400 font-medium mb-4">
              {personalInfo.title}
            </h2>
            <p className="responsive-text text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              {personalInfo.description}
            </p>
          </motion.div>

          {/* Boutons d'action */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
          >
            <Button
              onClick={() => scrollToSection('projects')}
              className="w-full sm:w-auto px-8 py-3 text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Voir mes projets
            </Button>
            <Button
              onClick={handleDownloadCV}
              variant="outline"
              className="w-full sm:w-auto px-8 py-3 text-base font-medium border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-full transition-all duration-300 transform hover:scale-105"
            >
              <Download className="w-4 h-4 mr-2" />
              Télécharger CV
            </Button>
          </motion.div>

          {/* Liens sociaux */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center space-x-4 sm:space-x-6 mb-8"
          >
            <motion.a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 sm:p-4 rounded-full glass-effect-premium hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
            >
              <Github className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.a>
            <motion.a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 sm:p-4 rounded-full glass-effect-premium hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
            >
              <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.a>
            <motion.a
              href={`mailto:${personalInfo.social.email}`}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 sm:p-4 rounded-full glass-effect-premium hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
            >
              <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.a>
          </motion.div>

          {/* Indicateur de scroll */}
          <motion.div
            variants={itemVariants}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.button
              onClick={() => scrollToSection('about')}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-2 rounded-full glass-effect-premium hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
            >
              <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroImproved;

