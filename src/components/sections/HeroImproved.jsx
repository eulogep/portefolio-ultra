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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.1) 25%, rgba(16, 185, 129, 0.05) 50%, transparent 70%)`,
      }}
    >
      {/* Particules flottantes animées */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-30"
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

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Photo de profil avec effet halo */}
          <motion.div
            variants={itemVariants}
            className="relative inline-block"
          >
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="relative"
            >
              {/* Halo lumineux */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 rounded-full blur-xl opacity-30 scale-110" />
              
              {/* Cercle extérieur avec animation */}
              <motion.div
                className="relative w-40 h-40 mx-auto"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 rounded-full p-1">
                  <div className="w-full h-full bg-gray-900 rounded-full p-2">
                    <img
                      src="/profile.jpg"
                      alt={`Photo de profil de ${personalInfo.name}`}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Icône sparkles animée */}
                <motion.div
                  className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4 text-white" />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Titre principal avec effet de frappe */}
          <motion.div variants={itemVariants} className="space-y-4">
            <motion.h1 
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
              {personalInfo.name}
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              {personalInfo.title}
            </motion.p>
            
            <motion.p 
              className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              {personalInfo.description}
            </motion.p>
          </motion.div>

          {/* Boutons d'action améliorés */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => scrollToSection('projects')}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Voir mes projets
                  <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleDownloadCV}
                variant="outline"
                className="group px-8 py-4 bg-transparent border-2 border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white font-semibold rounded-xl transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                  Télécharger CV
                </span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Liens sociaux améliorés */}
          <motion.div 
            variants={itemVariants}
            className="flex justify-center space-x-6"
          >
            {[
              { icon: Github, href: personalInfo.social.github, label: 'GitHub' },
              { icon: Linkedin, href: personalInfo.social.linkedin, label: 'LinkedIn' },
              { icon: Mail, href: `mailto:${personalInfo.social.email}`, label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl hover:border-gray-500 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                <span className="sr-only">{label}</span>
                
                {/* Tooltip */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  {label}
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Indicateur de scroll */}
          <motion.div
            variants={itemVariants}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center text-gray-400 cursor-pointer"
              onClick={() => scrollToSection('about')}
            >
              <span className="text-sm mb-2">Découvrir</span>
              <ArrowDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroImproved;

