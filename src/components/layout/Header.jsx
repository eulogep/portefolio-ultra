
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { personalInfo } from '@/data/portfolioData';

const navItems = [
  { id: 'home', label: 'Accueil' },
  { id: 'about', label: 'À propos' },
  { id: 'projects', label: 'Projets' },
  { id: 'contact', label: 'Contact' },
];

const Header = ({ darkMode, toggleDarkMode, activeSection, scrollToSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScrollAndCloseMenu = (sectionId) => {
    scrollToSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass-effect-premium safe-area"
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center py-3 sm:py-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-lg sm:text-xl md:text-2xl font-bold gradient-text cursor-pointer select-none"
            onClick={() => scrollToSection('home')}
          >
            {personalInfo.name}
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-6 xl:space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.id)}
                className={`capitalize transition-colors text-sm xl:text-base font-medium ${
                  activeSection === item.id
                    ? 'text-blue-500 font-semibold'
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-500'
                }`}
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* Tablet Navigation */}
          <div className="hidden md:flex lg:hidden space-x-4">
            {navItems.slice(0, 3).map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.id)}
                className={`capitalize transition-colors text-sm ${
                  activeSection === item.id
                    ? 'text-blue-500 font-semibold'
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-500'
                }`}
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className="p-2 sm:p-2.5 rounded-lg glass-effect hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={darkMode ? 'Passer au mode clair' : 'Passer au mode sombre'}
            >
              {darkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 sm:p-2.5 rounded-lg glass-effect hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden glass-effect-premium border-t border-gray-200/20 dark:border-gray-800/20"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleScrollAndCloseMenu(item.id)}
                  className={`block w-full text-left py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-base font-medium ${
                    activeSection === item.id
                      ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Header;