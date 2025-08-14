import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sun, 
  Moon, 
  Monitor, 
  Clock, 
  Palette, 
  Settings,
  ChevronDown 
} from 'lucide-react';
import useAdvancedDarkMode from '@/hooks/useAdvancedDarkMode';

const ThemeSwitcher = ({ 
  size = 'default', 
  showLabels = false, 
  variant = 'button',
  className = '' 
}) => {
  const {
    theme,
    setTheme,
    isDarkMode,
    toggleTheme,
    cycleTheme,
    systemPrefersDark,
    themeLabel,
    themeDescription,
    THEME_OPTIONS
  } = useAdvancedDarkMode();

  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const themeOptions = [
    {
      value: THEME_OPTIONS.LIGHT,
      label: 'Mode Clair',
      icon: Sun,
      description: 'Thème clair permanent',
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      value: THEME_OPTIONS.DARK,
      label: 'Mode Sombre',
      icon: Moon,
      description: 'Thème sombre permanent',
      gradient: 'from-indigo-500 to-purple-600'
    },
    {
      value: THEME_OPTIONS.SYSTEM,
      label: 'Système',
      icon: Monitor,
      description: 'Suit les préférences de votre appareil',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      value: THEME_OPTIONS.AUTO,
      label: 'Automatique',
      icon: Clock,
      description: 'Change selon l\'heure de la journée',
      gradient: 'from-green-500 to-emerald-500'
    }
  ];

  const currentOption = themeOptions.find(option => option.value === theme);
  const IconComponent = currentOption?.icon || Palette;

  const handleThemeSelect = (selectedTheme) => {
    setTheme(selectedTheme);
    setIsOpen(false);
    
    // Haptic feedback on mobile
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  // Simple toggle variant
  if (variant === 'toggle') {
    return (
      <motion.button
        onClick={toggleTheme}
        className={`relative p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 ${className}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label={`Basculer vers le mode ${isDarkMode ? 'clair' : 'sombre'}`}
      >
        <motion.div
          animate={{ rotate: isDarkMode ? 180 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-indigo-400" />
          )}
        </motion.div>
        
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap z-50"
            >
              {themeDescription}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    );
  }

  // Full dropdown variant
  return (
    <div className={`relative ${className}`}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label="Sélectionner le thème"
        aria-expanded={isOpen}
      >
        <div className={`p-2 rounded-lg bg-gradient-to-r ${currentOption?.gradient}`}>
          <IconComponent className="w-4 h-4 text-white" />
        </div>
        
        {showLabels && (
          <span className="text-sm font-medium text-foreground">
            {themeLabel}
          </span>
        )}
        
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-foreground/60" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full mt-2 right-0 min-w-[280px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-2">
                {themeOptions.map((option, index) => {
                  const isSelected = theme === option.value;
                  const IconComp = option.icon;
                  
                  return (
                    <motion.button
                      key={option.value}
                      onClick={() => handleThemeSelect(option.value)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                        isSelected 
                          ? 'bg-white/20 text-white' 
                          : 'hover:bg-white/10 text-foreground/80 hover:text-foreground'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${option.gradient} ${
                        isSelected ? 'scale-110' : ''
                      } transition-transform`}>
                        <IconComp className="w-4 h-4 text-white" />
                      </div>
                      
                      <div className="flex-1 text-left">
                        <div className="font-medium">{option.label}</div>
                        <div className="text-xs opacity-70">{option.description}</div>
                      </div>
                      
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className="w-2 h-2 bg-white rounded-full"
                          />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
              
              {/* System Status */}
              <div className="border-t border-white/10 p-3 bg-white/5">
                <div className="flex items-center gap-2 text-xs text-foreground/60">
                  <Monitor className="w-3 h-3" />
                  <span>
                    Système : {systemPrefersDark ? 'Sombre' : 'Clair'}
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSwitcher;
