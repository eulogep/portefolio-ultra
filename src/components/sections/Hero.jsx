import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { personalInfo } from '@/data/portfolioData';

const Hero = ({ scrollToSection, handleDownloadCV }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-gradient-to-br from-blue-50 via-yellow-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Fond décoratif SVG premium */}
      <svg className="absolute left-0 top-0 w-full h-full pointer-events-none opacity-20 z-0" aria-hidden="true">
        <defs>
          <radialGradient id="hero-grad" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="60%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <ellipse cx="80%" cy="20%" rx="220" ry="120" fill="url(#hero-grad)" />
        <ellipse cx="20%" cy="80%" rx="180" ry="100" fill="url(#hero-grad)" />
      </svg>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass-effect-premium p-10 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 animate-fade-in"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-8 flex flex-col items-center"
          >
            {/* Nouvelle photo de profil premium */}
            <div className="glass-effect-premium profile-halo-premium w-36 h-36 flex items-center justify-center rounded-full shadow-2xl border-2 border-blue-300 overflow-hidden">
              <img  
                alt={`Photo de profil de ${personalInfo.name}`}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
                src="/profile.jpg" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold mb-6 gradient-text-premium"
          >
            <span>{personalInfo.name}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 typing-animation"
          >
            {personalInfo.title}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12"
          >
            {personalInfo.shortDescription}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              onClick={() => scrollToSection('projects')}
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-full"
            >
              Voir mes projets
            </Button>
            <Button
              onClick={handleDownloadCV}
              variant="outline"
              size="lg"
              className="px-8 py-3 rounded-full"
            >
              <Download className="w-4 h-4 mr-2" />
              Télécharger CV
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex justify-center space-x-6 mt-12"
          >
            <motion.a whileHover={{ scale: 1.2, rotate: 5 }} href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full glass-effect hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Github className="w-6 h-6" />
            </motion.a>
            <motion.a whileHover={{ scale: 1.2, rotate: -5 }} href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full glass-effect hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Linkedin className="w-6 h-6" />
            </motion.a>
            <motion.a whileHover={{ scale: 1.2, rotate: 5 }} href={`mailto:${personalInfo.email}`} className="p-3 rounded-full glass-effect hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Mail className="w-6 h-6" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
      {/* Styles premium */}
      <style>{`
        .glass-effect-premium {
          background: rgba(255,255,255,0.25);
          box-shadow: 0 8px 32px 0 rgba(251,191,36,0.15);
          backdrop-filter: blur(16px);
          border: 1.5px solid rgba(255,255,255,0.18);
        }
        .profile-halo-premium {
          box-shadow: 0 0 0 8px #fbbf24aa, 0 0 32px 8px #60a5fa55, 0 8px 32px 0 rgba(251,191,36,0.15);
          transition: box-shadow 0.3s;
        }
        .profile-halo-premium:hover {
          box-shadow: 0 0 0 12px #f472b6cc, 0 0 48px 12px #60a5fa99, 0 8px 32px 0 rgba(251,191,36,0.25);
        }
        .gradient-text-premium {
          background: linear-gradient(90deg, #60a5fa 0%, #fbbf24 50%, #f472b6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .animate-fade-in {
          animation: fadeInHero 0.5s;
        }
        @keyframes fadeInHero {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default Hero;