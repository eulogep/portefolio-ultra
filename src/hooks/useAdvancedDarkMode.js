import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'portfolio-theme-preference';
const MEDIA_QUERY = '(prefers-color-scheme: dark)';

export const THEME_OPTIONS = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
  AUTO: 'auto' // Based on time of day
};

export const useAdvancedDarkMode = () => {
  const [theme, setTheme] = useState(THEME_OPTIONS.SYSTEM);
  const [systemPrefersDark, setSystemPrefersDark] = useState(false);
  const [autoMode, setAutoMode] = useState(false);
  const [timeBasedTheme, setTimeBasedTheme] = useState(THEME_OPTIONS.LIGHT);

  // Get effective dark mode state
  const isDarkMode = theme === THEME_OPTIONS.DARK || 
    (theme === THEME_OPTIONS.SYSTEM && systemPrefersDark) ||
    (theme === THEME_OPTIONS.AUTO && timeBasedTheme === THEME_OPTIONS.DARK);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    const mediaQuery = window.matchMedia(MEDIA_QUERY);
    
    setSystemPrefersDark(mediaQuery.matches);
    
    if (savedTheme && Object.values(THEME_OPTIONS).includes(savedTheme)) {
      setTheme(savedTheme);
    } else {
      // Default to system preference
      setTheme(THEME_OPTIONS.SYSTEM);
    }
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia(MEDIA_QUERY);
    
    const handleChange = (e) => {
      setSystemPrefersDark(e.matches);
      
      // If user is on system theme, trigger animation
      if (theme === THEME_OPTIONS.SYSTEM) {
        triggerThemeTransition();
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // Auto mode based on time of day
  useEffect(() => {
    if (theme !== THEME_OPTIONS.AUTO) return;

    const updateTimeBasedTheme = () => {
      const hour = new Date().getHours();
      // Dark mode from 8 PM to 6 AM
      const shouldBeDark = hour >= 20 || hour < 6;
      setTimeBasedTheme(shouldBeDark ? THEME_OPTIONS.DARK : THEME_OPTIONS.LIGHT);
    };

    updateTimeBasedTheme();
    
    // Check every minute for time-based changes
    const interval = setInterval(updateTimeBasedTheme, 60000);
    return () => clearInterval(interval);
  }, [theme]);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    
    // Remove all theme classes
    root.classList.remove('light', 'dark', 'theme-transitioning');
    body.classList.remove('light-mode', 'dark-mode');
    
    // Add appropriate theme class
    if (isDarkMode) {
      root.classList.add('dark');
      body.classList.add('dark-mode');
    } else {
      root.classList.add('light');
      body.classList.add('light-mode');
    }
    
    // Update meta theme-color for mobile browsers
    updateMetaThemeColor(isDarkMode);
    
    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, theme);
    
    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent('themeChange', {
      detail: { theme, isDarkMode, effective: getEffectiveTheme() }
    }));
  }, [isDarkMode, theme]);

  const updateMetaThemeColor = (dark) => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', dark ? '#0f172a' : '#ffffff');
    }
  };

  const triggerThemeTransition = () => {
    const root = document.documentElement;
    root.classList.add('theme-transitioning');
    
    setTimeout(() => {
      root.classList.remove('theme-transitioning');
    }, 300);
  };

  const setThemeWithTransition = useCallback((newTheme) => {
    triggerThemeTransition();
    setTimeout(() => {
      setTheme(newTheme);
    }, 50);
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = isDarkMode ? THEME_OPTIONS.LIGHT : THEME_OPTIONS.DARK;
    setThemeWithTransition(newTheme);
  }, [isDarkMode, setThemeWithTransition]);

  const cycleTheme = useCallback(() => {
    const themes = [THEME_OPTIONS.LIGHT, THEME_OPTIONS.DARK, THEME_OPTIONS.SYSTEM, THEME_OPTIONS.AUTO];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setThemeWithTransition(themes[nextIndex]);
  }, [theme, setThemeWithTransition]);

  const getEffectiveTheme = () => {
    if (theme === THEME_OPTIONS.SYSTEM) {
      return systemPrefersDark ? THEME_OPTIONS.DARK : THEME_OPTIONS.LIGHT;
    }
    if (theme === THEME_OPTIONS.AUTO) {
      return timeBasedTheme;
    }
    return theme;
  };

  const getThemeLabel = () => {
    switch (theme) {
      case THEME_OPTIONS.LIGHT:
        return '☀️ Clair';
      case THEME_OPTIONS.DARK:
        return '🌙 Sombre';
      case THEME_OPTIONS.SYSTEM:
        return '💻 Système';
      case THEME_OPTIONS.AUTO:
        return '🕐 Automatique';
      default:
        return '🎨 Thème';
    }
  };

  const getThemeDescription = () => {
    switch (theme) {
      case THEME_OPTIONS.LIGHT:
        return 'Mode clair activé';
      case THEME_OPTIONS.DARK:
        return 'Mode sombre activé';
      case THEME_OPTIONS.SYSTEM:
        return `Suit les préférences système (${systemPrefersDark ? 'sombre' : 'clair'})`;
      case THEME_OPTIONS.AUTO:
        return `Automatique selon l'heure (${timeBasedTheme === THEME_OPTIONS.DARK ? 'sombre' : 'clair'})`;
      default:
        return 'Thème par défaut';
    }
  };

  // Analytics tracking for theme usage
  const trackThemeChange = useCallback((newTheme) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'theme_change', {
        theme_mode: newTheme,
        effective_theme: getEffectiveTheme(),
        is_dark_mode: isDarkMode
      });
    }
  }, [isDarkMode]);

  // Performance monitoring
  const getThemePerformanceMetrics = () => {
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    
    return {
      currentTheme: theme,
      effectiveTheme: getEffectiveTheme(),
      isDarkMode,
      systemPrefersDark,
      backgroundColorVar: computedStyle.getPropertyValue('--background'),
      foregroundColorVar: computedStyle.getPropertyValue('--foreground'),
      transitionDuration: computedStyle.getPropertyValue('transition-duration')
    };
  };

  return {
    theme,
    setTheme: setThemeWithTransition,
    isDarkMode,
    toggleTheme,
    cycleTheme,
    systemPrefersDark,
    autoMode,
    timeBasedTheme,
    effectiveTheme: getEffectiveTheme(),
    themeLabel: getThemeLabel(),
    themeDescription: getThemeDescription(),
    trackThemeChange,
    getThemePerformanceMetrics,
    THEME_OPTIONS
  };
};

export default useAdvancedDarkMode;
